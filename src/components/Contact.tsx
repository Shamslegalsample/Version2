import { useState, useEffect, useRef } from 'react';
import { Phone, Mail, CheckCircle, ArrowRight, Upload, ShieldCheck, Loader2, Star, Scale, ChevronLeft, ChevronRight } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// REAL REVIEWS
const reviews = [
  {
    name: "Bahram Yassini",
    text: "I had a very positive experience with Sham Legal Services. Mr. Shams assisted me with our case and his support made the process much smoother. What really stood out was not only his deep expertise, but also his kindness, honesty, and professionalism.",
  },
  {
    name: "Faye S",
    text: "Mr. Shams is so kind and considerate. He met with me right away to act as Notary. Communication was excellent and he was on time. Definitely would recommend his Notary services!",
  },
  {
    name: "Lovejeet",
    text: "Went in for a notary appointment and had a great experience. The service was quick, but what stood out was how approachable the owner was. Professional, efficient, and just a genuinely nice person.",
  },
  {
    name: "Noah Hassan",
    text: "Awesome service, got the job done without a problem!",
  },
  {
    name: "Queen Sterling",
    text: "Service was great and extremely professional.",
  },
  {
    name: "Jessica E. O'Connell",
    text: "Mr. Sham is very friendly, professional, & accommodating. His service is quick & thorough. I've already been back twice!",
  },
  {
    name: "Lisa Smith",
    text: "My experience with Shams legal services was terrific. Very seamless and friendly. Would highly recommend.",
  },
  {
    name: "Kathy D",
    text: "Had to quickly have a form notarized and Shams Legal Services was able to accommodate me on short notice.",
  }
];

const Contact = () => {
  const [step, setStep] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    fileUrl: ''
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-rotate reviews (3.5 seconds)
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Navigation Functions
  const nextReview = () => {
    setIsAutoPlaying(false);
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setIsAutoPlaying(false);
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage.from('documents').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('documents').getPublicUrl(filePath);
      setFormData(prev => ({ ...prev, fileUrl: data.publicUrl }));
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const { error } = await supabase.from('contact_messages').insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
        file_url: formData.fileUrl
      }]);
      if (error) throw error;
      setStep(4);
    } catch (error) {
      console.error('Error saving inquiry:', error);
      alert('Something went wrong. Please check your Supabase table setup.');
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* The Premium Split Card - MOBILE FIXED: h-auto on mobile, h-[800px] on desktop */}
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row h-auto lg:h-[800px]">
          
          {/* LEFT PANEL */}
          <div className="lg:w-2/5 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white p-8 flex flex-col relative overflow-hidden shrink-0">
            
            {/* Animated Background Orbs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-blue-500 rounded-full mix-blend-overlay filter blur-[80px] opacity-40 animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-purple-500 rounded-full mix-blend-overlay filter blur-[80px] opacity-40 animate-pulse" style={{animationDelay: '2s'}}></div>
            </div>

            {/* Branding */}
            <div className="relative z-10 mb-8 lg:mb-10 flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10"><Scale className="w-6 h-6 text-white" /></div>
                <span className="font-bold text-xl tracking-wide">SHAMS LEGAL</span>
            </div>

            {/* CENTER INFO: Heading + Contact Details */}
            <div className="relative z-10 mb-8 lg:mb-auto space-y-6 lg:space-y-8">
                 <h2 className="text-2xl lg:text-3xl font-bold leading-tight">
                    {step === 1 && "Let's start your legal journey."}
                    {step === 2 && "Tell us about yourself."}
                    {step === 3 && "Securely upload documents."}
                    {step === 4 && "You are all set!"}
                 </h2>

                 {/* Contact Chips */}
                 <div className="space-y-4">
                    <div className="flex items-center gap-4 text-blue-50 bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                          <Phone className="w-5 h-5" />
                        </div>
                        <span className="text-base lg:text-lg font-medium">(647) 333-9381</span>
                    </div>
                    <div className="flex items-center gap-4 text-blue-50 bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                          <Mail className="w-5 h-5" />
                        </div>
                        <span className="text-xs lg:text-sm font-medium break-all">Canada@shamslegalservices.ca</span>
                    </div>
                 </div>
            </div>

            {/* Reviews Section (HIDDEN ON MOBILE to save space) */}
            <div className="relative z-10 mt-8 hidden lg:block">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl transition-all duration-500">
                    
                    <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
                        <div className="flex text-yellow-400 gap-1">
                            {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                        </div>
                        <span className="text-xs font-medium text-blue-200 tracking-wider">GOOGLE REVIEWS</span>
                    </div>

                    {/* Review Text */}
                    <div className="relative h-40"> 
                        {reviews.map((review, index) => (
                            <div 
                                key={index}
                                className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out
                                    ${index === currentReview ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'}`}
                            >
                                <p className="text-sm leading-relaxed text-white font-light italic mb-3 line-clamp-4">
                                    "{review.text}"
                                </p>
                                <p className="font-bold text-white text-sm">{review.name}</p>
                            </div>
                        ))}
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                        <div className="flex gap-1.5">
                            {reviews.map((_, idx) => (
                                <button 
                                  key={idx} 
                                  onClick={() => { setIsAutoPlaying(false); setCurrentReview(idx); }}
                                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentReview ? 'w-6 bg-white' : 'w-1.5 bg-white/30'}`} 
                                />
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <button onClick={prevReview} className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white"><ChevronLeft className="w-4 h-4" /></button>
                            <button onClick={nextReview} className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white"><ChevronRight className="w-4 h-4" /></button>
                        </div>
                    </div>

                </div>
            </div>
          </div>

          {/* RIGHT PANEL: Form Wizard */}
          <div className="lg:w-3/5 p-6 md:p-12 bg-white flex flex-col relative overflow-y-auto">
            
            {/* Step Progress */}
            {step < 4 && (
              <div className="absolute top-6 right-6 lg:top-8 lg:right-10 flex items-center gap-2 text-xs lg:text-sm font-medium text-gray-400">
                <span className={step >= 1 ? "text-blue-600" : ""}>01</span>
                <div className={`w-6 lg:w-8 h-1 rounded-full ${step >= 2 ? "bg-blue-600" : "bg-gray-200"}`}></div>
                <span className={step >= 2 ? "text-blue-600" : ""}>02</span>
                <div className={`w-6 lg:w-8 h-1 rounded-full ${step >= 3 ? "bg-blue-600" : "bg-gray-200"}`}></div>
                <span className={step >= 3 ? "text-blue-600" : ""}>03</span>
              </div>
            )}

            <div className="flex-1 flex flex-col justify-center mt-8 lg:mt-0">
              
              {/* STEP 1 */}
              {step === 1 && (
                <div className="animate-fadeIn space-y-6 max-w-md mx-auto w-full">
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">Select Service</h3>
                  <p className="text-gray-500">How can we help you today?</p>
                  <div className="grid grid-cols-1 gap-4 mt-6">
                    {['Notary Public', 'Paralegal Services', 'Legal Consultation', 'Other'].map((service) => (
                      <button key={service} onClick={() => { setFormData({ ...formData, service: service }); setStep(2); }}
                        className={`p-5 rounded-xl border-2 text-left transition-all hover:border-blue-400 hover:bg-blue-50 flex justify-between items-center group
                        ${formData.service === service ? 'border-blue-600 bg-blue-50' : 'border-gray-100'}`}>
                        <span className="font-semibold text-gray-700 group-hover:text-blue-700">{service}</span>
                        <ArrowRight className={`w-5 h-5 text-gray-300 group-hover:text-blue-600 transition-colors ${formData.service === service ? 'text-blue-600' : ''}`} />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="animate-fadeIn space-y-6 max-w-md mx-auto w-full">
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">Your Details</h3>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                      <input type="text" id="name" value={formData.name} onChange={handleChange}
                        className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all" placeholder="John Doe" />
                    </div>
                    <div className="grid grid-cols-1 gap-5">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                        <input type="email" id="email" value={formData.email} onChange={handleChange}
                          className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all" placeholder="john@example.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                        <input type="tel" id="phone" value={formData.phone} onChange={handleChange}
                          className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all" placeholder="(123) 456-7890" />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 pt-6">
                    <button onClick={() => setStep(1)} className="px-6 py-3 text-gray-500 font-medium hover:bg-gray-100 rounded-xl transition-colors">Back</button>
                    <button onClick={() => formData.name && formData.email ? setStep(3) : alert('Name and Email required')}
                      className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex justify-center items-center gap-2">
                      Continue <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="animate-fadeIn space-y-6 max-w-md mx-auto w-full">
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">Upload ID</h3>
                  <p className="text-gray-500">Please provide a valid ID for verification.</p>
                  
                  <div onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl h-56 lg:h-64 cursor-pointer transition-all flex flex-col items-center justify-center text-center
                      ${formData.fileUrl ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'}`}>
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                    
                    {uploading ? <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-3" /> 
                    : formData.fileUrl ? <CheckCircle className="w-12 h-12 text-green-600 mb-3" />
                    : <Upload className="w-12 h-12 text-gray-400 mb-3" />}
                    
                    <div className="font-medium text-gray-900 text-lg">
                      {uploading ? 'Uploading...' : formData.fileUrl ? 'Upload Successful' : 'Click to Upload'}
                    </div>
                    {!formData.fileUrl && !uploading && <div className="text-sm text-gray-500 mt-2">PDF, JPG, PNG (Max 5MB)</div>}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button onClick={() => setStep(2)} className="px-6 py-3 text-gray-500 font-medium hover:bg-gray-100 rounded-xl transition-colors">Back</button>
                    <button onClick={handleSubmit}
                      className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex justify-center items-center gap-2">
                      {formData.fileUrl ? 'Finish & Book' : 'Skip & Book'} <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex justify-center items-center gap-2 text-xs text-gray-400">
                    <ShieldCheck className="w-3 h-3" /> Data is encrypted & secure
                  </div>
                </div>
              )}

              {/* STEP 4: CALENDLY FIX FOR MOBILE */}
              {step === 4 && (
                <div className="animate-fadeIn h-full flex flex-col w-full">
                  <div className="mb-4 text-center lg:text-left">
                    <h3 className="text-2xl font-bold text-gray-900">Select Appointment</h3>
                    <p className="text-gray-500 text-sm">Choose a time that works best for you.</p>
                  </div>
                  
                  {!iframeLoaded && (
                    <div className="flex justify-center items-center py-10">
                        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                    </div>
                  )}
                  
                  {/* FORCE HEIGHT ON MOBILE: h-[950px] ensures scroll. lg:h-full fits desktop. */}
                  <div className={`w-full rounded-xl overflow-hidden border border-gray-100 shadow-inner transition-opacity duration-500 
                      ${iframeLoaded ? 'opacity-100' : 'opacity-0'} 
                      h-[950px] lg:h-full`}>
                     <iframe 
                        src="https://calendly.com/lovejeet-tulika/30min" 
                        width="100%" 
                        height="100%" 
                        frameBorder="0"
                        onLoad={() => setIframeLoaded(true)}
                     ></iframe>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;