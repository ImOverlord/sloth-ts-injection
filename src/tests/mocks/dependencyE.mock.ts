import { slothInject } from '../../injector';
import { DependencyA } from "./dependencyA.mock";
import { DependencyD } from './dependencyD.mock';

@slothInject()
export class DependencyE {

    constructor(
        public a: DependencyA,
        public d: DependencyD
    ) { }

    public update() {
        this.d.update();
    }
}
