import { Scale, FileCheck, MessageSquare, ArrowRight } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Scale,
      title: 'Paralegal Services',
      description: 'Professional legal representation and support for various legal matters within the scope of paralegal practice.',
      features: [
        'Small claims court representation',
        'Traffic tickets & provincial offences',
        'Landlord and tenant matters',
        'Summary conviction appeals'
      ]
    },
    {
      icon: FileCheck,
      title: 'Certified Notary Public',
      description: 'Official notarization services for documents requiring authentication and certification.',
      features: [
        'Document authentication',
        'Affidavit commissioning',
        'Statutory declarations',
        'Certified true copies'
      ]
    },
    {
      icon: MessageSquare,
      title: 'Legal Consultation',
      description: 'Expert guidance and consultation to help you understand your legal rights and options.',
      features: [
        'Initial case assessment',
        'Legal advice and guidance',
        'Document review',
        'Strategy development'
      ]
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-red-600 font-semibold text-sm uppercase tracking-wider mb-2 block">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Comprehensive Legal Support
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional legal services tailored to meet your specific needs with expertise and care
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group bg-gradient-to-br from-white to-red-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-red-200 hover:-translate-y-2"
              >
                <div className="bg-gradient-to-br from-red-600 to-red-700 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={scrollToContact}
                  className="group/btn flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition-colors"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 lg:p-12 text-center shadow-xl">
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Need Legal Assistance?
          </h3>
          <p className="text-red-50 text-lg mb-6 max-w-2xl mx-auto">
            Book your appointment today and get the professional legal support you deserve
          </p>
          <button
            onClick={scrollToContact}
            className="bg-white text-red-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl font-semibold text-lg inline-flex items-center gap-2"
          >
            Schedule Consultation
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
