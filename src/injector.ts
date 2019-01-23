import "reflect-metadata";

type IType<T> = new(...args: Array<any>) => T;

interface IContainer {
    name: string;
    class: any;
}

export const slothInject = (): (target: IType<any>) => void => {
    return (target: IType<any>) => { return; };
};

export class Injector {

    private container: Array<IContainer> = [];

    public register(className: string, target: IType<any>) {
        const tokens = Reflect.getMetadata("design:paramtypes", target) || [];
        const inject = tokens.map((token: any) => this.resolve(token));
        const newClass: IContainer = {
            class: new target(...inject),
            name: className
        };
        this.container.push(newClass);
        return newClass.class;
    }

    public inject<T>(target: IType<any>): T {
        return this.resolve(target);
    }

    private resolve<T>(target: IType<any>): T {
        const tokens = Reflect.getMetadata("design:paramtypes", target) || [];
        const inject = tokens.map((token: any) => this.resolve(token));
        const className = (target as any).name;
        const temp = this.container.filter((dependency: IContainer) => {
            if (dependency.name === className)
                return dependency;
            return null;
        });
        if (temp.length > 0)
            return temp[0].class;
        const newClass: IContainer = {
            class: new target(...inject),
            name: className
        };
        this.container.push(newClass);
        return newClass.class;
    }
}
