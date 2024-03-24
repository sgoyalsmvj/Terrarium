export interface PlantProps {
  id: string;
  src: string;
  alt: string;
  onMouseDown?: (e: React.MouseEvent<HTMLImageElement>) => void;
  style?: React.CSSProperties; // Add this line
}

const Plant: React.FC<PlantProps> = ({ id, src, alt, onMouseDown }) => {
  return (
    <div className="plant-holder">
      <img
        src={src}
        alt={alt}
        id={id}
        className="plant"
        onMouseDown={onMouseDown}
        style={{ position: "absolute" , top: 0, left: 0  }} // Add this line
      />
    </div>
  );
};
export default Plant;
