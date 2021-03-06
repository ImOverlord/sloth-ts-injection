import { Injector } from '../injector';
import { DependencyA } from './mocks/dependencyA.mock';
import { DependencyB } from './mocks/dependencyB.mock';
import { DependencyC } from './mocks/dependencyC.mock';
import { DependencyD } from './mocks/dependencyD.mock';
import { DependencyE } from './mocks/dependencyE.mock';

describe("Basic Injection Test", () => {

    let injector: Injector;

    beforeEach(() => {
        injector = new Injector();
    });

    it("Should add a dependencie", () => {
        const dep: DependencyA = injector.register("DependencyA", DependencyA);

        expect(injector['container'].length).toBe(1);
        expect(dep).toBeInstanceOf(DependencyA);
    });

    it("Should register complex dependency", () => {
        const dep: DependencyD = injector.register("DependencyD", DependencyD);

        expect(injector['container'].length).toBe(2);
        expect(dep).toBeInstanceOf(DependencyD);
    });

    it("Should retreive", () => {
        const dep: DependencyC = injector.inject(DependencyC);

        expect(dep).not.toBeNull();
        expect(dep).not.toBeUndefined();
        expect(dep.a).not.toBeNull();
        expect(dep.a).not.toBeUndefined();
    });

    it("Shouldn't instanciated multiple time the same dependency", () => {
        const dep: DependencyC = injector.inject(DependencyC);
        const dep2: DependencyD = injector.inject(DependencyD);

        expect(dep.a.data).toBe(0);
        dep.update();
        expect(dep.a.data).toBe(1);
        expect(dep2.a.data).toBe(1);
    });

    it("Should register Mocks", () => {
        const dep: DependencyA = injector.register("DependencyA", DependencyB);

        expect(injector['container'].length).toBe(1);
        expect(dep).toBeInstanceOf(DependencyB);
    });

    it("Should resolve a 'complex' dependency tree", () => {
        const dep: DependencyE = injector.inject(DependencyE);

        expect(dep).not.toBeNull();
        expect(dep).not.toBeUndefined();
        expect(dep.a).not.toBeNull();
        expect(dep.a).not.toBeUndefined();
        expect(dep.d).not.toBeNull();
        expect(dep.d).not.toBeUndefined();
        expect(dep.d.a).not.toBeNull();
        expect(dep.d.a).not.toBeUndefined();
        expect(dep.a.data).toBe(0);
        dep.update();
        expect(dep.a.data).toBe(1);
        expect(dep.d.a.data).toBe(1);
    });

    afterEach(() => {
        injector = null;
    });
});
