import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
} from "react-router";
import type { Route } from "./+types/layout";

import "../app.css";
import sybilogo from "../resources/SYBI-main.jpg";
import element1 from "../resources/SYBI-element-1.png";
import element2 from "../resources/SYBI-element-2.png";
import element3 from "../resources/SYBI-element-3.png";
import element4 from "../resources/SYBI-element-4.png";
import element5 from "../resources/SYBI-logo-alt.jpg";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

const BackgroundElements = () => {
  const elementImages = [element1, element2, element3, element4, element5];
  
  // Create an array of random positions for elements
  const elements = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    rotate: `${Math.random() * 360}deg`,
    size: `${Math.random() * (200 - 100) + 100}px`, // Smaller size for better performance
    delay: `${Math.random() * 15}s`,
    image: elementImages[i % elementImages.length] // Cycle through the images
  }));

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-gray-50">
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute opacity-[0.15] animate-float will-change-transform"
          style={{
            top: element.top,
            left: element.left,
            width: element.size,
            height: element.size,
            backgroundImage: `url(${element.image})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            transform: `rotate(${element.rotate})`,
            animationDelay: element.delay,
            WebkitBackfaceVisibility: 'hidden',
            WebkitPerspective: 1000,
            WebkitTransform: `rotate(${element.rotate}) translateZ(0)`,
            perspective: 1000,
            transformStyle: 'preserve-3d'
          }}
        />
      ))}
    </div>
  );
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <style>
          {`
            @keyframes float {
              0% { 
                transform: translate3d(0, 0, 0) rotate(0deg);
                -webkit-transform: translate3d(0, 0, 0) rotate(0deg);
              }
              25% { 
                transform: translate3d(15px, 15px, 0) rotate(5deg);
                -webkit-transform: translate3d(15px, 15px, 0) rotate(5deg);
              }
              50% { 
                transform: translate3d(0, 30px, 0) rotate(0deg);
                -webkit-transform: translate3d(0, 30px, 0) rotate(0deg);
              }
              75% { 
                transform: translate3d(-15px, 15px, 0) rotate(-5deg);
                -webkit-transform: translate3d(-15px, 15px, 0) rotate(-5deg);
              }
              100% { 
                transform: translate3d(0, 0, 0) rotate(0deg);
                -webkit-transform: translate3d(0, 0, 0) rotate(0deg);
              }
            }
            
            @-webkit-keyframes float {
              0% { 
                transform: translate3d(0, 0, 0) rotate(0deg);
                -webkit-transform: translate3d(0, 0, 0) rotate(0deg);
              }
              25% { 
                transform: translate3d(15px, 15px, 0) rotate(5deg);
                -webkit-transform: translate3d(15px, 15px, 0) rotate(5deg);
              }
              50% { 
                transform: translate3d(0, 30px, 0) rotate(0deg);
                -webkit-transform: translate3d(0, 30px, 0) rotate(0deg);
              }
              75% { 
                transform: translate3d(-15px, 15px, 0) rotate(-5deg);
                -webkit-transform: translate3d(-15px, 15px, 0) rotate(-5deg);
              }
              100% { 
                transform: translate3d(0, 0, 0) rotate(0deg);
                -webkit-transform: translate3d(0, 0, 0) rotate(0deg);
              }
            }

            .animate-float {
              animation: float 15s ease-in-out infinite;
              -webkit-animation: float 15s ease-in-out infinite;
              animation-fill-mode: both;
              -webkit-animation-fill-mode: both;
            }
          `}
        </style>
      </head>
      <body className="h-full flex flex-col pt-[120px] sm:pt-20 relative">
        <BackgroundElements />
        
        <header className="bg-white shadow-lg p-4 flex flex-col sm:flex-row items-center justify-between h-auto sm:h-20 fixed top-0 left-0 right-0 z-10">
          <div className="flex flex-col sm:flex-row items-center">
            <Link to="/">
                <img src={sybilogo} alt="SYBI Logo" className="h-15 w-15 sm:h-15 sm:w-15 lg:h-15 lg:w-15 transform scale-110 sm:scale-100 mr-0 sm:mr-4 mb-2 sm:mb-0" />
            </Link>
            <h1 className="text-sm sm:text-base lg:text-lg font-medium italic text-center sm:text-left">Discover businesses you can trust...</h1>
          </div>
          <nav className="flex items-center space-x-4 sm:space-x-6 mt-2 sm:mt-0">
            <Link 
              to="/submit-review" 
              className="bg-lime-500 hover:bg-lime-600 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors shadow-sm hover:shadow flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" />
              </svg>
              Submit a Review
            </Link>
          </nav>
        </header>
        <main className="flex-grow container mx-auto p-4 relative z-1">
          <div className="rounded-xl p-6">
            {children}
            <Outlet />
          </div>
        </main>
        <footer className="bg-white shadow-lg p-4 text-center relative z-1">
          <div className="flex flex-col items-center space-y-2">
            <p className="text-gray-600">&copy; {currentYear} SYBI.</p>
            <a 
              href="https://www.instagram.com/shouldyoubuyit_ng/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-lime-600 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.09 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.09 1.407.09 4.123v.08c0 2.643-.012 2.987-.09 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.09-4.123.09h-.08c-2.643 0-2.987-.012-4.043-.09-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.09-1.379-.09-3.808v-.63c0-2.43.013-2.784.09-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
              @shouldubuyit_ng
            </a>
          </div>
        </footer>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}