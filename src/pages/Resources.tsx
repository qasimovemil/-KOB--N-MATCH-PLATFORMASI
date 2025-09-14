
const Resources = () => {
  const resources = [
    {
      title: "Biznes Planı Yazımı",
      description: "Uğurlu biznes planı yazmaq üçün addım-addım təlimat",
      type: "Guide",
      link: "#"
    },
    {
      title: "Maliyyə Analizi",
      description: "Biznesinizi maliyyə baxımından necə analiz edəcəyinizi öyrənin",
      type: "Tutorial",
      link: "#"
    },
    {
      title: "İnvestor Təqdimatı",
      description: "İnvestorları cəlb etmək üçün effektiv təqdimat hazırlama",
      type: "Template",
      link: "#"
    },
    {
      title: "Startup Hüquq Məsələləri",
      description: "Startuplar üçün vacib hüquqi məlumatlar",
      type: "Legal",
      link: "#"
    },
    {
      title: "Bazar Araşdırması",
      description: "Hədəf bazarınızı necə araşdıracağınızı öyrənin",
      type: "Research",
      link: "#"
    },
    {
      title: "Rəqəmsal Marketinq",
      description: "Startup üçün rəqəmsal marketinq strategiyaları",
      type: "Marketing",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Resurslar</h1>
          <p className="text-lg text-gray-600">
            Biznesinizi inkişaf etdirmək üçün faydalı məlumatlar və təlimatlar
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {resource.type}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {resource.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {resource.description}
              </p>
              <a 
                href={resource.link}
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
              >
                Oxu
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Əlavə Dəstək</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Mentorluq Proqramı
              </h3>
              <p className="text-gray-600 mb-4">
                Təcrübəli sahibkarlardan şəxsi məsləhət alın
              </p>
              <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/80 transition-colors">
                Müraciət Et
              </button>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Webinar Seriyası
              </h3>
              <p className="text-gray-600 mb-4">
                Mütəxəssislərdən canlı təlimlərə qoşulun
              </p>
              <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/80 transition-colors">
                Qeydiyyat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Resources