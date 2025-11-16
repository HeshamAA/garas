export const AuthBranding = () => {
  return (
    <div className="order-1 md:order-2 flex flex-col items-center justify-center space-y-6 md:space-y-8">
      <div className="relative">
        <div className="w-48 h-48 md:w-64 md:h-64 bg-primary/20 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="relative text-primary">
          <svg className="w-48 h-48 md:w-[300px] md:h-[300px]" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="150" cy="100" r="80" fill="currentColor" opacity="0.8"/>
            <ellipse cx="150" cy="100" rx="60" ry="80" fill="currentColor"/>
            <ellipse cx="120" cy="80" rx="15" ry="20" fill="white"/>
            <ellipse cx="180" cy="80" rx="15" ry="20" fill="white"/>
            <path d="M150 250 L100 200 L150 180 L200 200 Z" fill="currentColor" opacity="0.6"/>
            <path d="M150 180 L120 220 L150 280 L180 220 Z" fill="currentColor" opacity="0.8"/>
          </svg>
        </div>
        <div className="absolute -top-6 -right-6 md:-top-8 md:-right-8">
          <svg className="w-16 h-16 md:w-[100px] md:h-[100px]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="40" r="30" fill="#579FE7" opacity="0.6"/>
            <ellipse cx="50" cy="40" rx="20" ry="30" fill="#579FE7"/>
          </svg>
        </div>
      </div>

      <div className="text-center space-y-3 md:space-y-4">
        <h2 className="text-3xl md:text-5xl font-bold text-primary">مرحبـــاً</h2>
        <p className="text-base md:text-xl text-muted-foreground px-4">
          مرحباً بك في تطبيق جرس
          <br />
          لحلول وبرامج للمدارس
        </p>
      </div>
    </div>
  );
};