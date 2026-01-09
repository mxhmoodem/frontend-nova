export default function CornerPattern() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Top Right Corner */}
      <div className="absolute -top-[10%] -right-[5%] w-[40vw] h-[40vw] min-w-[300px] min-h-[300px] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute top-0 right-0 w-[30vw] h-[30vw] min-w-[200px] min-h-[200px] opacity-[0.03] dark:opacity-[0.05]">
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-primary fill-current"
        >
          <path
            d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.5,70.8,32C59.4,42.5,47.9,50.6,36.5,58.3C25.1,66,13.8,73.3,1.4,70.9C-11,68.5,-24.5,56.4,-36.9,46.1C-49.3,35.8,-60.6,27.3,-68.8,16.2C-77,5.1,-82.1,-8.6,-78.4,-20.9C-74.7,-33.2,-62.2,-44.1,-49.4,-51.8C-36.6,-59.5,-23.5,-64.1,-10.4,-64.5C2.7,-64.9,15.8,-61.1,30.5,-83.6L44.7,-76.4Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      {/* Bottom Left Corner */}
      <div className="absolute -bottom-[10%] -left-[5%] w-[40vw] h-[40vw] min-w-[300px] min-h-[300px] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[25vw] h-[25vw] min-w-[150px] min-h-[150px] opacity-[0.03] dark:opacity-[0.05]">
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-foreground fill-current"
        >
          <path
            d="M39.9,-65.7C54.1,-60.5,69.5,-53.8,78.9,-42.6C88.3,-31.4,91.7,-15.7,89.6,-0.9C87.5,13.9,79.9,27.8,69.6,38.3C59.3,48.8,46.3,55.9,33.5,62.8C20.7,69.7,8.1,76.4,-3.8,83C-15.7,89.6,-26.9,96.1,-37.2,92.5C-47.5,88.9,-56.9,75.2,-64.7,61.9C-72.5,48.6,-78.7,35.7,-81.9,22.1C-85.1,8.5,-85.3,-5.8,-80.7,-18.8C-76.1,-31.8,-66.7,-43.5,-55.1,-50.2C-43.5,-56.9,-29.7,-58.6,-16.6,-61.2C-3.5,-63.8,10,-67.3,25.7,-70.9L39.9,-65.7Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.2]" />
    </div>
  );
}
