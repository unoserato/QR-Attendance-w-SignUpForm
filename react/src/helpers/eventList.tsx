const eventList = [
  {
    id: 1,
    name: "CCS Week",
    description: "Welcome Fiery Foxes",
    startDate: "2025-11-04T08:00:00",
    endDate: "2025-11-08T08:00:00",
    bannerURL:
      "https://thumbs.dreamstime.com/b/fiery-fox-black-background-fire-dark-fantasy-animal-element-305391351.jpg",
  },
  {
    id: 2,
    name: "Mock Event",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium reprehenderit sapiente, sunt est quis, amet unde nemo quia voluptates suscipit doloribus. Nesciunt minus quae, distinctio commodi ipsum ad! Eaque, optio!",
    startDate: "2025-11-04T08:00:00",
    endDate: "2025-11-08T08:00:00",
    bannerURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMGDU4tVKkWwmBjCzmKx4ZPi8ph3A77fuQfg&s",
  },
  {
    id: 3,
    name: "Mock Event",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium reprehenderit sapiente, sunt est quis, amet unde nemo quia voluptates suscipit doloribus. Nesciunt minus quae, distinctio commodi ipsum ad! Eaque, optio!",
    startDate: "2025-11-04T08:00:00",
    endDate: "2025-11-08T08:00:00",
    bannerURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMGDU4tVKkWwmBjCzmKx4ZPi8ph3A77fuQfg&s",
  },
  {
    id: 4,
    name: "Mock Event",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium reprehenderit sapiente, sunt est quis, amet unde nemo quia voluptates suscipit doloribus. Nesciunt minus quae, distinctio commodi ipsum ad! Eaque, optio!",
    startDate: "2025-11-04T08:00:00",
    endDate: "2025-11-08T08:00:00",
    bannerURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMGDU4tVKkWwmBjCzmKx4ZPi8ph3A77fuQfg&s",
  },
  {
    id: 5,
    name: "Upcoming Event",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium reprehenderit sapiente, sunt est quis, amet unde nemo quia voluptates suscipit doloribus. Nesciunt minus quae, distinctio commodi ipsum ad! Eaque, optio!",
    startDate: "2025-11-20T08:00:00",
    endDate: "2025-11-25T08:00:00",
    bannerURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMGDU4tVKkWwmBjCzmKx4ZPi8ph3A77fuQfg&s",
  },
  {
    id: 6,
    name: "Upcoming Event",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium reprehenderit sapiente, sunt est quis, amet unde nemo quia voluptates suscipit doloribus. Nesciunt minus quae, distinctio commodi ipsum ad! Eaque, optio!",
    startDate: "2025-11-01T08:00:00",
    endDate: "2025-11-02T08:00:00",
    bannerURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMGDU4tVKkWwmBjCzmKx4ZPi8ph3A77fuQfg&s",
  },
];

export interface EventType {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  bannerURL: string;
}

export default eventList;
