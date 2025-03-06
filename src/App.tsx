import React, { useState, useRef, useCallback } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { toPng, toSvg } from 'html-to-image';
import { Download, Upload, Image as ImageIcon, Link as LinkIcon, Sparkles } from 'lucide-react';

function App() {
  const [url, setUrl] = useState('');
  const [color, setColor] = useState('#ffffff');
  const [logo, setLogo] = useState<string | null>(null);
  const [useCustomLogo, setUseCustomLogo] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadQRCode = useCallback(async (format: 'png' | 'svg') => {
    if (!qrRef.current) return;

    try {
      const dataUrl = format === 'png' 
        ? await toPng(qrRef.current, { quality: 1.0 })
        : await toSvg(qrRef.current);
      
      const link = document.createElement('a');
      link.download = `qrcode.${format}`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error downloading QR code:', err);
    }
  }, []);

  return (
    <div className="min-h-screen bg-mesh text-white flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(120,80,255,0.1),rgba(255,255,255,0)_50%)]"></div>
        </div>
      </div>

      <div className="glassmorphic rounded-3xl w-full max-w-4xl p-8 space-y-8 relative z-10">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
              QR Code Generator
            </h1>
            <Sparkles className="w-6 h-6 text-cyan-400" />
          </div>
          <p className="text-gray-300">Transform your links into beautiful QR codes</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-300">Enter URL</label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 h-5 w-5" />
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="pl-10 w-full rounded-xl input-glassmorphic text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent p-3"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-300">QR Code Color</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-12 w-full rounded-xl cursor-pointer bg-transparent border border-purple-500/30"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-300">Custom Logo</label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={!useCustomLogo}
                    onChange={() => setUseCustomLogo(false)}
                    className="text-purple-500 focus:ring-purple-500 focus:ring-offset-0"
                  />
                  <span>No Logo</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={useCustomLogo}
                    onChange={() => setUseCustomLogo(true)}
                    className="text-purple-500 focus:ring-purple-500 focus:ring-offset-0"
                  />
                  <span>Add Logo</span>
                </label>
              </div>
              {useCustomLogo && (
                <div className="mt-2">
                  <label className="flex items-center justify-center w-full h-32 px-4 transition input-glassmorphic rounded-xl cursor-pointer hover:border-purple-500/50 focus:outline-none border-2 border-purple-500/30">
                    <div className="flex flex-col items-center space-y-2">
                      <Upload className="w-6 h-6 text-purple-400" />
                      <span className="text-sm text-gray-300">Click to upload logo</span>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleLogoUpload}
                    />
                  </label>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => downloadQRCode('png')}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 py-3 px-4 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-purple-500/25"
              >
                <Download className="w-5 h-5" />
                <span>Download PNG</span>
              </button>
              <button
                onClick={() => downloadQRCode('svg')}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 py-3 px-4 rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 shadow-lg shadow-blue-500/25"
              >
                <ImageIcon className="w-5 h-5" />
                <span>Download SVG</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div ref={qrRef} className="glassmorphic p-8 rounded-2xl shadow-2xl">
              <QRCodeSVG
                value={url || 'https://example.com'}
                size={256}
                fgColor={color}
                bgColor="transparent"
                level="H"
                imageSettings={
                  useCustomLogo && logo
                    ? {
                        src: logo,
                        x: undefined,
                        y: undefined,
                        height: 48,
                        width: 48,
                        excavate: true,
                      }
                    : undefined
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;