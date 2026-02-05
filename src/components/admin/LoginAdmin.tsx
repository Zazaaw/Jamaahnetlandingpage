import { useState } from "react";
import BlurFade from "../magicui/blur-fade";
import { Shield, Mail, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";

interface LoginAdminProps {
  onLogin: () => void;
  onBackToHome: () => void;
}

export function LoginAdmin({ onLogin, onBackToHome }: LoginAdminProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation for demo
    if (email && password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Islamic Pattern Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23059669' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M30 30l15-15v15H30zM15 45l15-15v15H15zm30 0l15-15v15H45zM0 45l15-15v15H0zm0-30l15-15v15H0z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <BlurFade delay={0.1} inView>
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors mb-8"
            >
              <ArrowLeft className="w-5 h-5" />
              Kembali ke Beranda
            </button>
          </BlurFade>

          {/* Login Card */}
          <BlurFade delay={0.2} inView>
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-8 text-center">
                <div className="inline-flex p-4 bg-white/10 backdrop-blur-sm rounded-2xl mb-4">
                  <Shield className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">
                  Admin Login
                </h1>
                <p className="text-emerald-100">
                  Portal Administrator Jamaah.net
                </p>
              </div>

              {/* Form */}
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Input */}
                  <BlurFade delay={0.3} inView>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Email Admin
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                          placeholder="admin@jamaah.net"
                          required
                        />
                      </div>
                    </div>
                  </BlurFade>

                  {/* Password Input */}
                  <BlurFade delay={0.4} inView>
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Password Admin
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="block w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                          placeholder="••••••••"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                          )}
                        </button>
                      </div>
                    </div>
                  </BlurFade>

                  {/* Submit Button */}
                  <BlurFade delay={0.5} inView>
                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg hover:shadow-xl"
                    >
                      Masuk Dashboard
                    </button>
                  </BlurFade>

                  {/* Note */}
                  <BlurFade delay={0.6} inView>
                    <div className="text-center pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                        <Shield className="w-4 h-4" />
                        Akses terbatas untuk administrator
                      </p>
                    </div>
                  </BlurFade>
                </form>
              </div>
            </div>
          </BlurFade>

          {/* Additional Info */}
          <BlurFade delay={0.7} inView>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Office Hour: Senin – Jumat, 09.00 – 17.00 WIB
              </p>
            </div>
          </BlurFade>
        </div>
      </div>
    </div>
  );
}
