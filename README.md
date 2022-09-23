<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
<h3 align="center">musala-frontend</h3>
  <p align="center">
    Pokemon store build with React and Redux
    <br />
    <a href="https://github.com/bjvalmaseda-dev/musala-frontend"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/bjvalmaseda-dev/musala-frontend/issues">Report Bug</a>  
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#tests">Test</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
   
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![musala list Screen Shot][product-list]
![musala gateway Screen Shot][product-gateway]

This sample project is managing gateways - master devices that control multiple peripheral devices. 
Your task is to create a REST service (JSON/HTTP) for storing information about these gateways and their associated devices. This information must be stored in the database. 

When storing a gateway, any field marked as “to be validated” must be validated and an error returned if it is invalid. Also, no more that 10 peripheral devices are allowed for a gateway.

The service must also offer an operation for displaying information about all stored gateways (and their devices) and an operation for displaying details for a single gateway. Finally, it must be possible to add and remove a device from a gateway.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Next.js][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![Material UI][Material-ui]][Material-ui-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

For run this project locally you must has installed:
* Node Package Manager (NPM)
* Git
* yarn


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/bjvalmaseda-dev/musala-frontend.git
   ```
3. Install all dependency
   ```sh
   yarn
   ```
4. Copy and rename `.env.example` to `.env`

5. Edit .env with your API url
    ```.env
    NEXT_PUBLIC_API_URL=http://{api-url}
    ```
6. Build and start the server
   ```sh
   yarn build && yarn start
   ```


<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Test
To run test just execute 
```sh
yarn test
```


<!-- CONTACT -->
## Contact

Bárbaro Javier Valmaseda - [@bjvalmaseda](https://twitter.com/bjvalmaseda) - hello@bjvalmaseda.xyz

Project Link: [https://github.com/bjvalmaseda-dev/musala-frontend](https://github.com/bjvalmaseda-dev/musala-frontend)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


[product-gateway]: readme/gateway.png
[product-list]: readme/gateway-list.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Material-ui]: https://img.shields.io/badge/Material%20UI-001e3c?style=for-the-badge&logo=mui&logoColor=007FFF
[Material-ui-url]: https://mui.com/
