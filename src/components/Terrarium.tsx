import React from "react";
import Plant, { PlantProps } from "./Plant";

interface TerrariumProps {}

const Terrarium: React.FC<TerrariumProps> = () => {
  const [plants, setPlants] = React.useState<PlantProps[]>([]);

  const handleDragStart = (
    event: React.MouseEvent<HTMLImageElement>,
    plantId: string
  ) => {
    event.preventDefault();
    console.log("Dragging plant with ID:", plantId);
    const containerRect =
      event.currentTarget.parentElement?.getBoundingClientRect();
    if (!containerRect) return;

    const initialX = event.clientX;
    const initialY = event.clientY;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - initialX;
      const deltaY = moveEvent.clientY - initialY;
      console.log("Delta X:", deltaX, "Delta Y:", deltaY);
      setPlants((prevPlants) => {
        // console.log("Previous Plants:", prevPlants);
        let updatedPlants = prevPlants;
        updatedPlants =  prevPlants.map((plant) =>
          plant.id === plantId
            ? {
                ...plant,
                style: {
                  ...plant.style,
                  position: "absolute",
                  top: plant.style?.top
                    ? `${(plant.style.top as number) - deltaY}px`
                    : 0,
                  left: plant.style?.left
                    ? `${(plant.style.left as number) - deltaX}px`
                    : 0,
                },
              }
            : plant
        );
        console.log("Prev Plants:", prevPlants);
        console.log("Updated Plants:", updatedPlants);
        return updatedPlants
      });
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const plantList = [
    { id: "plant1", src: "../assets/plant1.png", alt: "Plant 1" },
    { id: "plant2", src: "../assets/plant2.png", alt: "Plant 2" },
    { id: "plant3", src: "../assets/plant3.png", alt: "Plant 3" },
    { id: "plant4", src: "../assets/plant4.png", alt: "Plant 4" },
    { id: "plant5", src: "../assets/plant5.png", alt: "Plant 5" },
    { id: "plant6", src: "../assets/plant6.png", alt: "Plant 6" },
    { id: "plant7", src: "../assets/plant7.png", alt: "Plant 7" },
    { id: "plant8", src: "../assets/plant8.png", alt: "Plant 8" },
    { id: "plant9", src: "../assets/plant9.png", alt: "Plant 9" },
    { id: "plant10", src: "../assets/plant10.png", alt: "Plant 10" },
    { id: "plant11", src: "../assets/plant11.png", alt: "Plant 11" },
    { id: "plant12", src: "../assets/plant12.png", alt: "Plant 12" },
    { id: "plant13", src: "../assets/plant13.png", alt: "Plant 13" },
    { id: "plant14", src: "../assets/plant14.png", alt: "Plant 14" },
  ];

  React.useEffect(() => {
    setPlants(plantList);
  }, []);

  return (
    <div>
      <div id="left-container" className="container">
        {plants &&
          plants
            .filter((plant) => parseInt(plant.id.replace("plant", "")) <= 7)
            .map((plant) => (
              <Plant
                key={plant.id}
                {...plant}
                onMouseDown={(e) => handleDragStart(e, plant.id)}
              />
            ))}
      </div>
      <div id="right-container" className="container">
        {plants &&
          plants
            .filter((plant) => parseInt(plant.id.replace("plant", "")) > 7)
            .map((plant) => (
              <Plant
                key={plant.id}
                {...plant}
                onMouseDown={(e) => handleDragStart(e, plant.id)}
              />
            ))}
      </div>
      <div id="terrarium">
        <div className="jar-top"></div>
        <div className="jar-walls">
          <div className="jar-glossy-long"></div>
          <div className="jar-glossy-short"></div>
        </div>
        <div className="dirt"></div>
        <div className="jar-bottom"></div>
      </div>
    </div>
  );
};

export default Terrarium;
