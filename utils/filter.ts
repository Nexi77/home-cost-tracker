import { useAppStore } from '~~/stores/app';

export class Filter<T extends Record<string, any>>
{
    private $initials: Record<string, any> = {};

    [prop: string]: any;

    public constructor(data: T)
    {
        this.setInitialValues(data);
        this.withData(data);
    }

    withData(data: T)
    {
        for (const field in data)
        {
            this[field as string] = data[field];
        }
    }

    data()
    {
        const data = {} as any;

        for (const property in this.$initials)
        {
            data[property] = this[property] as any;
        }

        return data as T;
    }

    reset()
    {
        for (const field in this.$initials)
        {
            this[field as string] = this.$initials[field as string];
        }
    }

    setInitialValues(values: Record<string, any>)
    {
        this.$initials = {};

        for (const field in values)
        {
            this.$initials[field as string] = values[field as string];
        }
    }

    static createFilter(identifier: string | number, data: Record<string, any>)
    {
        const store = useAppStore();
        if (!store.filters[identifier]) {
            const filter = new Filter(data);
            store.setFilter(identifier, filter);
        }
        const filter = store.filters[identifier];
        return filter;
    }

    static updateFilter(identifier: string | number, data: Record<string, any>)
    {
        const store = useAppStore();

        return store.updateFilter(identifier, data);
    }

    isEmpty()
    {
        const instance: any = { ...this };

        delete instance.$initials;

        const values = Object.values(instance);

        return values.every(value => value === null || value === undefined || value === '' || value === 'all');
    }

    toJSON()
    {
        return { ...this }; // here I make a POJO's copy of the class instance
    }
}

export const createFilter = (id: string | number, data: Record<string, any>) =>
{
    Filter.createFilter(id, data);
};
