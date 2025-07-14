interface Pokemon {
    weight: number;
    types: Array<{
        type: {
            name: string;
            url: string;
        };
    }>;
    stats: Array<{
        base_stat: number;
        stat: {
            name: string;
        };
    }>;
    sprites: {
        other: {
            'official-artwork': {
                front_default: string;
            };
        };
    };
}
