// src/components/AzerbaijanAdm1Map.tsx
// Basit, bağımsız SVG harita: Highcharts AZ ADM1 GeoJSON'unu (UTM koordinatlar) runtime'da çekip
// viewBox'a sığdırarak çiziyor. React 19 ile çalışır, ek bağımlılık gerektirmez.

import React, { useEffect, useMemo, useState } from 'react';

type Position = [number, number];
type LinearRing = Position[];
type Polygon = LinearRing[]; // [ring][point][x,y]
type MultiPolygon = Polygon[];

interface FeatureProps {
  name?: string;
  [key: string]: unknown;
}

interface FeatureGeom {
  type: 'Polygon' | 'MultiPolygon';
  coordinates: Polygon | MultiPolygon;
}

interface Feature {
  type: 'Feature';
  id?: string;
  properties: FeatureProps;
  geometry: FeatureGeom;
}

interface FeatureCollection {
  type: 'FeatureCollection';
  features: Feature[];
}

type Props = {
  width?: number;
  height?: number;
  onRegionClick?: (name: string) => void;
  selectedName?: string;
};

const DATA_URL =
  'https://code.highcharts.com/mapdata/countries/az/az-all.geo.json';

function computeBounds(features: Feature[]): { minX: number; minY: number; maxX: number; maxY: number } {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  const visitPoint = (p: Position) => {
    const [x, y] = p;
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  };
  const visitPolygon = (poly: Polygon) => {
    for (const ring of poly) for (const pt of ring) visitPoint(pt);
  };
  for (const f of features) {
    if (f.geometry.type === 'Polygon') visitPolygon(f.geometry.coordinates as Polygon);
    else for (const poly of f.geometry.coordinates as MultiPolygon) visitPolygon(poly);
  }
  return { minX, minY, maxX, maxY };
}

function pathFromPolygon(poly: Polygon, scaleX: number, scaleY: number, minX: number, minY: number, height: number): string {
  const parts: string[] = [];
  for (const ring of poly) {
    if (!ring.length) continue;
    const [x0, y0] = ring[0];
    const Mx = (x0 - minX) * scaleX;
    const My = height - (y0 - minY) * scaleY; // y ekseni ters çevrilir
    parts.push(`M ${Mx.toFixed(2)} ${My.toFixed(2)}`);
    for (let i = 1; i < ring.length; i++) {
      const [x, y] = ring[i];
      const X = (x - minX) * scaleX;
      const Y = height - (y - minY) * scaleY;
      parts.push(`L ${X.toFixed(2)} ${Y.toFixed(2)}`);
    }
    parts.push('Z');
  }
  return parts.join(' ');
}

// Highcharts özelliklerinde iqtisadi bölge ismi mevcut: properties.region
const ECONOMIC_REGION_TO_CLUSTER: Record<string, string> = {
  'Absheron Economic Region': 'Bakı',
  'Ganja-Gazakh Economic Region': 'Gəncə-Qazax',
  'Shaki-Zaqatala Economic Region': 'Şəki-Zaqatala',
  'Lankaran Economic Region': 'Lənkəran',
  'Aran Economic Region': 'Şirvan-Salyan',
};

function clusterFromProps(props: { [key: string]: unknown }): string | undefined {
  const region = (props.region as string | undefined) ?? '';
  if (region && ECONOMIC_REGION_TO_CLUSTER[region]) return ECONOMIC_REGION_TO_CLUSTER[region];
  // Başqa iqtisadi regionlar (məsələn Kalbajar-Lachin, Karabakh, Naxçıvan və s.)
  // hal-hazırda analiz klasterlərinə daxil deyil → undefined qaytarırıq.
  return undefined;
}

const AzerbaijanAdm1Map: React.FC<Props> = ({ width = 540, height = 360, onRegionClick, selectedName }) => {
  const [data, setData] = useState<FeatureCollection | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hoverName, setHoverName] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch(DATA_URL)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as FeatureCollection;
        if (mounted) setData(json);
      })
      .catch((e) => mounted && setError(String(e)));
    return () => {
      mounted = false;
    };
  }, []);

  const bounds = useMemo(() => {
    if (!data) return null;
    try {
      return computeBounds(data.features);
    } catch {
      return null;
    }
  }, [data]);

  if (error) {
    return (
      <div className="p-4 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200">Xəritə yüklənmədi: {error}</div>
    );
  }
  if (!data || !bounds) {
    return (
      <div className="flex items-center justify-center h-72 bg-gray-100 rounded-lg text-gray-500 text-sm">Xəritə yüklənir…</div>
    );
  }

  const padding = 8; // iç boşluk
  const innerW = width - padding * 2;
  const innerH = height - padding * 2;
  const scaleX = innerW / (bounds.maxX - bounds.minX);
  const scaleY = innerH / (bounds.maxY - bounds.minY);
  const scale = Math.min(scaleX, scaleY);
  const offsetX = (width - (bounds.maxX - bounds.minX) * scale) / 2;
  const offsetY = (height - (bounds.maxY - bounds.minY) * scale) / 2;

  const toPath = (geom: FeatureGeom): string => {
    if (geom.type === 'Polygon') {
      return pathFromPolygon(geom.coordinates as Polygon, scale, scale, bounds.minX, bounds.minY, height - offsetY);
    }
    const parts: string[] = [];
    for (const poly of geom.coordinates as MultiPolygon) {
      parts.push(pathFromPolygon(poly, scale, scale, bounds.minX, bounds.minY, height - offsetY));
    }
    return parts.join(' ');
  };

  const handleClick = (props: FeatureProps) => {
    const cluster = clusterFromProps(props);
    if (onRegionClick && cluster) onRegionClick(cluster);
  };

  const isSelected = (props: FeatureProps) => {
    const cluster = clusterFromProps(props);
    return cluster && selectedName && cluster === selectedName;
  };

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
      <g transform={`translate(${offsetX.toFixed(2)}, ${(-offsetY).toFixed(2)})`}>
        {data.features.map((f, idx) => {
          const name = (f.properties?.name as string | undefined) ?? '—';
          const cluster = clusterFromProps(f.properties);
          const selected = !!cluster && isSelected(f.properties);
          const clickable = !!cluster;
          const hovered = hoverName === name;
          return (
            <path
              key={f.id ?? idx}
              d={toPath(f.geometry)}
              fill={selected ? '#9B823F' : hovered && clickable ? '#9B823F22' : '#E5E7EB'}
              stroke="#9CA3AF"
              strokeWidth={selected ? 1.5 : 1}
              className={"transition-colors duration-200 " + (clickable ? "cursor-pointer" : "cursor-not-allowed opacity-80")}
              onMouseEnter={() => clickable && setHoverName(name)}
              onMouseLeave={() => setHoverName((prev) => (prev === name ? null : prev))}
              onClick={() => clickable && handleClick(f.properties)}
            >
              <title>{name}{!clickable ? ' — Hazırda analizə daxil deyil' : ''}</title>
            </path>
          );
        })}
      </g>
    </svg>
  );
};

export default AzerbaijanAdm1Map;
