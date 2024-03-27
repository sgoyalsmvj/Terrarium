import React from "react";
import Plant, { PlantProps } from "./Plant";

interface TerrariumProps {}

const Terrarium: React.FC<TerrariumProps> = () => {
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
  const [plants, setPlants] = React.useState<PlantProps[]>(plantList);

  function handleDragStart(
    event: React.MouseEvent<HTMLImageElement>,
    plantId: string
  ) {
    event.preventDefault();
    let pos1 = 0;
    let pos2 = 0;
    let pos3 = 0;
    let pos4 = 0;

    function elementDrag(e: MouseEvent) {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;

      setPlants((prevPlants) =>
        prevPlants.map((plant) => {
          if (plant.id === plantId) {
            let box = document.getElementById(`${plantId}`);
            let rect = box?.getBoundingClientRect();
            if (!rect) return plant;
            let { top, left } = rect;
            return {
              ...plant,
              style: {
                top: top - pos2 + "px",
                left: left - pos1 + "px",
              },
            };
          }
          return plant;
        })
      );
    }

    function closeDragElement(e: MouseEvent) {
      e.preventDefault();
      document.removeEventListener("mousemove", elementDrag);
      document.removeEventListener("mouseup", closeDragElement);
    }

    function pointerDrag(e: MouseEvent) {
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.addEventListener("mousemove", elementDrag);
      document.addEventListener("mouseup", closeDragElement);
    }

    document.addEventListener("mousemove", pointerDrag);
  }

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
