// src/components/GeoJsonMap.tsx
// Basit bağımsız Web Mercator projeksiyonlu GeoJSON haritası (d3 bağımlılığı olmadan)
// Polygon ve MultiPolygon destekler. Haritayı otomatik sığdırır ve renklendirme fonksiyonu alır.

import React, { useMemo } from 'react';

export type GeoJSONFeature = {
  type: 'Feature';
  properties: Record<string, any>;
  geometry: {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: number[][][] | number[][][][]; // [ring][point][lon/lat] veya multi için bir seviye daha
  };
};

export type GeoJSON = {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
};

interface Props {
  geojson: GeoJSON;
  width?: number;
  height?: number;
  selectedRegion?: string;
  nameProp?: string; // feature.properties içindeki isim alanı (örn: NAME_1, name, region, shapeName)
  getFillByName: (name: string) => string;
  onRegionClick?: (name: string, feature: GeoJSONFeature) => void;
}

// Basit Web Mercator projeksiyonu
function mercator([lon, lat]: [number, number]): [number, number] {
  const lambda = (lon * Math.PI) / 180;
  const phi = (lat * Math.PI) / 180;
  const x = lambda;
  const y = Math.log(Math.tan(Math.PI / 4 + phi / 2));
  return [x, y];
}

function getFeatureBounds(feature: GeoJSONFeature): [number, number, number, number] {
  const coords = feature.geometry.coordinates as any;
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

  const iter = (arr: any) => {
    if (typeof arr[0][0] === 'number') {
      // ring düzeyi: [ [lon,lat], ... ]
      (arr as number[][]).forEach(([lon, lat]) => {
        const [x, y] = mercator([lon, lat]);
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      });
    } else {
      arr.forEach(iter);
    }
  };
  iter(coords);

  return [minX, minY, maxX, maxY];
}

function getCollectionBounds(features: GeoJSONFeature[]): [number, number, number, number] {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  features.forEach((f) => {
    const [a, b, c, d] = getFeatureBounds(f);
    if (a < minX) minX = a;
    if (b < minY) minY = b;
    if (c > maxX) maxX = c;
    if (d > maxY) maxY = d;
  });
  return [minX, minY, maxX, maxY];
}

function toPathD(feature: GeoJSONFeature, sx: number, sy: number, tx: number, ty: number): string {
  const coords = feature.geometry.coordinates as any;

  const projectPoint = ([lon, lat]: [number, number]) => {
    const [mx, my] = mercator([lon, lat]);
    const x = mx * sx + tx;
    const y = ( -my) * sy + ty; // SVG y aşağıya doğru büyüdüğü için ters çeviriyoruz
    return [x, y];
  };

  const ringToPath = (ring: number[][]) => {
    return ring.map((pt, idx) => {
      const [x, y] = projectPoint(pt as any);
      return `${idx === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
    }).join(' ') + ' Z';
  };

  if (feature.geometry.type === 'Polygon') {
    return (coords as number[][][]).map(ringToPath).join(' ');
  } else {
    return (coords as number[][][][]).map((poly) => poly.map(ringToPath).join(' ')).join(' ');
  }
}

const GeoJsonMap: React.FC<Props> = ({
  geojson,
  width = 800,
  height = 500,
  selectedRegion,
  nameProp = 'name',
  getFillByName,
  onRegionClick,
}) => {
  const { paths, viewBox } = useMemo(() => {
    if (!geojson || !geojson.features || geojson.features.length === 0) {
      return { paths: [], viewBox: `0 0 ${width} ${height}` };
    }

    // Bounds
    const [minX, minY, maxX, maxY] = getCollectionBounds(geojson.features);
    const boundsWidth = maxX - minX;
    const boundsHeight = maxY - minY;

    // Fit to viewport with padding
    const pad = 20;
    const sx = (width - 2 * pad) / boundsWidth;
    const sy = (height - 2 * pad) / boundsHeight;
    const s = Math.min(sx, sy);

    const tx = pad + (-minX) * s;
    const ty = pad + (maxY) * s; // y ters çevrildiği için maxY kullanıyoruz

    const computed = geojson.features.map((f) => {
      const name = (f.properties && (f.properties[nameProp] ?? f.properties.NAME_1 ?? f.properties.region ?? f.properties.NAME)) || 'Unknown';
      const d = toPathD(f, s, s, tx, ty);
      return { d, name, feature: f };
    });

    return { paths: computed, viewBox: `0 0 ${width} ${height}` };
  }, [geojson, width, height, nameProp]);

  return (
    <svg viewBox={viewBox} width="100%" height="100%" className="rounded-lg">
      {paths.map(({ d, name, feature }, idx) => (
        <path
          key={idx}
          d={d}
          fill={getFillByName(name)}
          stroke="#374151"
          strokeWidth={selectedRegion === name ? 3 : 1.5}
          className="cursor-pointer transition-all hover:opacity-80"
          onClick={() => onRegionClick && onRegionClick(name, feature)}
        >
        </path>
      ))}
    </svg>
  );
};

export default GeoJsonMap;
