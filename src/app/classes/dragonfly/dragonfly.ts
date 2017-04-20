export class Dragonfly {
    private _commonName: string;
    private _latinName: string;
    private _headerPicture: string;
    private _criteria: number[][];
    private _pictures: string[];
    private _description: string;
    private _behavior: string;
    private _flyPeriod: number[];
    private _anecdote: string;
    private _threat: string;
    private _links: {link: string, value: string}[];
    private _distributionMap: string;

    public commonName(): string{
        return this._commonName;
    }
    public latinName(): string{
        return this._latinName;
    }
    public headerPicture(): string{
        return this._headerPicture;
    }
    public criteria(): number[][]{
        return this._criteria;
    }
    public pictures(): string[]{
        return this._pictures;
    }
    public description(): string{
        return this._description;
    }
    public behavior(): string{
        return this._behavior;
    }
    public flyPeriod():number[]{
        return this._flyPeriod;
    }
    public anecdote(): string{
        return this._anecdote;
    }
    public threat(): string{
        return this._threat;
    }
    public links(): {link: string, value: string}[]{
        return this._links;
    }
    public distributionMap(): string{
        return this._distributionMap;
    }

}
