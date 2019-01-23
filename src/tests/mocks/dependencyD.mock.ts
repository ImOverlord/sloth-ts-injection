import { slothInject } from '../../injector';
import { DependencyA } from "./dependencyA.mock";

@slothInject()
export class DependencyD {

    constructor(public a: DependencyA) { }

    public update() {
        this.a.data++;
    }
}
