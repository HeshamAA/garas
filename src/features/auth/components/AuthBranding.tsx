export const AuthBranding = () => {
  return (
    <div className="order-1 md:order-2 flex flex-col items-center justify-center space-y-6 md:space-y-8">
      <div className="relative">
        <div className="w-48 h-48 md:w-64 md:h-64 bg-primary/20 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="relative flex items-center justify-center">
          <img 
            src="/Logo 2.svg" 
            alt="جرس" 
            className="w-48 h-48 md:w-[300px] md:h-[300px] object-contain animate-in fade-in zoom-in duration-700"
          />
        </div>
      </div>

      <div className="text-center space-y-3 md:space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
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