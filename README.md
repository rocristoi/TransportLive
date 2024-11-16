
#  ![Small Logo](https://i.imgur.com/cZml8QG.png)  TransportLive 

TransportLive is an application that fetches real-time transport data from the new **Societate de Transport București (STB)** API. By entering a station ID, the app displays the upcoming vehicles and their estimated arrival times, helping you plan your journey in Bucharest with ease.

## Features

- Fetches real-time transport data from the STB API.
- Displays upcoming vehicles at a specific station.
- Shows the estimated arrival times of vehicles at the station.
- Simple and intuitive user interface for easy navigation.
- Automatically updates vehicle data based on the provided station ID.

## Installation

### Prerequisites

Before you begin, ensure that you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [Git](https://git-scm.com/)

### Clone the Repository

Clone the TransportLive repository to your local machine:

```bash
git clone https://github.com/yourusername/transportlive.git
cd transportlive
```

### Install Dependencies

Navigate to the project directory and install the necessary dependencies using npm:

```bash
npm install
```

### Running the Project

Start the application with the following command:

```bash
npm start
```
This will launch the application, and you can access it in your web browser. The app will be available at http://localhost:5173/ by default.

## Usage

1. Launch the app.
2. Enter the station ID (from the STB database) in the input field.
2. View the list of vehicles that are expected to arrive at the station, including the estimated arrival time for each vehicle.
3. The data is updated in real time based on the station ID you provide.

### Example Usage:
Example Station ID: 12354

![](https://i.imgur.com/1jALW8J.png)



## Contributing
If you'd like to contribute to TransportLive, follow these steps:

1. Fork the repository on GitHub.
2. Clone your fork to your local machine.
3. Create a new branch (git checkout -b feature-name).
4. Make your changes.
4. Commit your changes (git commit -am 'Add feature').
5. Push your changes to your fork (git push origin feature-name).
6. Create a Pull Request.

*Please make sure your changes are well-documented, and ensure the app works as expected before submitting your PR.*

## License
This project is licensed under the MIT License - see the  [LICENSE](LICENSE) file for details.

## Acknowledgments
1. Thank you to the STB (Societate de Transport București) and to the cool IT team @ TPBI for finally providing the public transport API.
2. Special thanks to the open-source community for providing useful libraries and tools that helped in building this project.