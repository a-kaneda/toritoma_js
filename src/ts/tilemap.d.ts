type TileMapObject = {
    height: number,
    id: number,
    name: string,
    properties?: {[key: string]: any},
    propertytypes?: {[key: string]: string},
    rotation: number,
    type: string,
    visible: boolean,
    width: number,
    x: number,
    y: number,
}

type ObjectGroup = {
    draworder: string,
    name: string,
    objects: TileMapObject[],
    opacity: number,
    type: string,
    visible: boolean,
    x: number,
    y: number,
}

type TileLayer = {
    data: number[],
    height: number,
    name: string,
    opacity: number,
    type: string,
    visible: boolean,
    width: number,
    x: number,
    y: number,
}

type ObjectLayer = {
    draworder: string,
    name: string,
    objects: TileMapObject[],
    opacity: number,
    type: string,
    visible: boolean,
    x: number,
    y: number,    
}

type TileSet = {
    columns: number,
    firstgid: number,
    image: string,
    imageheight: number,
    imagewidth: number,
    margin: number,
    name: string,
    spacing: number,
    tilecount: number,
    tileheight: number,
    tiles: {[key: string]: {
        objectgroup: ObjectGroup,
    }},
    tilewidth: number,
    transparentcolor: string,
}

type TileMap = {
    height: number,
    layers: [TileLayer|ObjectLayer],
    nextobjectid: number,
    orientation: string,
    renderorder: string,
    tiledversion: string,
    tileheight: number,
    tilesets: TileSet[],
    tilewidth: number,
    type: string,
    version: number,
    width: number,
}

declare var TileMaps: {[key: string]: TileMap};