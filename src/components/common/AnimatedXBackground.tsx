export default function AnimatedXBackground() {
  return (
    <div className="x-bg-container-fixed">
      {/* Top Left Corner */}
      <div className="absolute top-10 left-10 x-md x-gold-primary x-shape animate-float-slow"></div>
      <div className="absolute top-20 left-40 x-sm x-white-medium x-shape animate-bounce-slow"></div>
      
      {/* Top Center */}
      <div className="absolute top-16 left-1/3 x-lg x-gold-secondary x-shape animate-float-medium"></div>
      <div className="absolute top-32 left-1/2 x-sm-md x-gold-light x-shape animate-pulse-slow"></div>
      
      {/* Top Right Corner */}
      <div className="absolute top-12 right-20 x-md-lg x-white-strong x-shape animate-float-fast"></div>
      <div className="absolute top-28 right-1/4 x-sm x-gold-accent x-shape animate-bounce-medium"></div>
      
      {/* Middle Left */}
      <div className="absolute top-1/3 left-16 x-lg x-gold-dark x-shape animate-pulse-slow"></div>
      <div className="absolute top-1/2 left-32 x-sm-md x-white-medium x-shape animate-float-medium"></div>
      
      {/* Middle Center */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 x-lg-xl x-gold-primary x-shape animate-float-slow opacity-30"></div>
      
      {/* Middle Right */}
      <div className="absolute top-1/3 right-24 x-md x-gold-light x-shape animate-bounce-fast"></div>
      <div className="absolute top-1/2 right-1/3 x-lg x-white-medium x-shape animate-float-medium"></div>
      
      {/* Bottom Left Corner */}
      <div className="absolute bottom-16 left-20 x-md-lg x-gold-secondary x-shape animate-float-fast"></div>
      <div className="absolute bottom-32 left-1/4 x-sm x-white-strong x-shape animate-pulse-slow"></div>
      
      {/* Bottom Center */}
      <div className="absolute bottom-20 left-1/2 x-lg x-gold-accent x-shape animate-bounce-medium"></div>
      <div className="absolute bottom-36 left-2/3 x-sm-md x-gold-primary x-shape animate-float-slow"></div>
      
      {/* Bottom Right Corner */}
      <div className="absolute bottom-12 right-16 x-md x-gold-light x-shape animate-float-medium"></div>
      <div className="absolute bottom-28 right-1/4 x-lg x-white-medium x-shape animate-bounce-slow"></div>
      
      {/* Additional scattered X shapes */}
      <div className="absolute top-1/4 left-2/3 x-sm x-gold-dark x-shape animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 left-1/3 x-sm-md x-white-strong x-shape animate-float-fast"></div>
      <div className="absolute top-2/3 right-1/3 x-sm x-gold-secondary x-shape animate-bounce-medium"></div>
    </div>
  );
}