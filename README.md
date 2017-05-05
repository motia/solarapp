# Solar Control

> A hybird application for solar energy forecasting, usage planning and monitoring
[(competed in nasa app challenge 2017)](https://2017.spaceappschallenge.org/challenges/earth-and-us/you-are-my-sunshine/details)
[by NBT](https://2017.spaceappschallenge.org/challenges/earth-and-us/you-are-my-sunshine/teams/nbt/project)

## Usage

### enter the configuration of the solar panel
![panel](docs/img/panel.png)

### register the devices you have in your house
![devices](docs/img/devices.png)

### create a plan for your energy usage
![tasks](docs/img/tasks.png)

### vizualise the enregy evolution and check for power shortage warning
![Graph](docs/img/graph.png)
![Graph](docs/img/battery.png)

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:8080
$ npm run dev

# build for production with minification
# [Note you need quasar for this operation]
$ quasar build
$ quasar wrap quordova
$ cd cordova
$ cordova build
```
