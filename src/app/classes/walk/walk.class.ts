export class Walk {
    private _id: number;
    private _name: string;
    private _duration: string;
    private _diversity: number;
    private _difficulty: number;
    private _length: number;
    private _description: string;
    private _species: {name: string, flyFrom: number, flyTo: number}[];
    private _pictures: string[];
    private _pathKML: string;
    
    public id(): number{
        return this._id;
    }
    public name(): string{
        return this._name;
    }
    public duration(): string{
        return this._duration;
    }
    public diversity(): number{
        return this._diversity;
    }
    public difficulty(): number{
        return this._difficulty;
    }
    public length(): number{
        return this._length;
    }
    public description(): string{
        return this._description;
    }
    public species(): {name: string, flyFrom: number, flyTo: number}[]{
        return this._species;
    }
    public pictures(): string[]{
        return this._pictures;
    }
    public pathKML(): string{
        return this._pathKML;
    }

}
