import { GraduationCap, Award, Users, TrendingUp } from 'lucide-react';

const About = () => {
  const credentials = [
    {
      icon: Award,
      title: 'Licensed Paralegal',
      description: 'License P18004',
      detail: 'Law Society of Ontario'
    },
    {
      icon: GraduationCap,
      title: 'Master\'s Degree',
      description: 'Political Science',
      detail: 'Advanced legal education'
    },
    {
      icon: TrendingUp,
      title: 'Top 1% Ranking',
      description: 'National Bar Exam',
      detail: 'Ranked 183/20,000'
    },
    {
      icon: Users,
      title: 'Client-Focused',
      description: 'Personalized approach',
      detail: 'Compassionate service'
    }
  ];

  const achievements = [
    'Two bachelor\'s degrees in Law and Political Science',
    'Ranked 21st in National University Entrance Exam',
    'Extensive multilingual professional background',
    'Appointment-based personalized service'
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-gradient-to-br from-gray-50 to-red-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-red-600 font-semibold text-sm uppercase tracking-wider mb-2 block">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              <a 
                href="https://blinq.me/5tZqwOK2wCp1"  // <-- PUT YOUR BUSINESS CARD LINK HERE
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-red-600 hover:underline transition-colors"
              >
                Meet Mreza Shams
              </a>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A highly qualified legal professional with extensive education and a proven track record
              of excellence. Committed to providing high-quality legal support with a personalized and
              compassionate approach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {credentials.map((credential, index) => {
              const Icon = credential.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100"
                >
                  <div className="bg-gradient-to-br from-red-600 to-red-700 w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-md">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">
                    {credential.title}
                  </h3>
                  <p className="text-red-600 font-semibold text-sm mb-1">
                    {credential.description}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {credential.detail}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                  Professional Journey
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  With a strong academic foundation and exceptional performance in national examinations,
                  Mreza Shams brings a wealth of knowledge and expertise to every case. The combination of
                  advanced degrees and practical experience ensures clients receive the highest quality
                  legal representation.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Based in Peterborough, Ontario, Shams Legal Services is dedicated to making legal
                  support accessible and understandable, ensuring every client receives personalized
                  attention and expert guidance throughout their legal journey.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Key Achievements</h4>
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-gradient-to-r from-red-50 to-transparent rounded-lg p-4 border-l-4 border-red-600"
                  >
                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 font-medium">{achievement}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-center shadow-xl">
            <p className="text-white text-lg lg:text-xl font-medium italic">
              "Committed to providing high-quality legal support with a personalized and compassionate approach"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
