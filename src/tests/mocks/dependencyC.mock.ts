import { slothInject } from '../../injector';
import { DependencyA } from "./dependencyA.mock";

@slothInject()
export class DependencyC {

    constructor(public a: DependencyA) { }

    public update() {
        this.a.data++;
    }
}
