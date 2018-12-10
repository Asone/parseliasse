import { Parseliasse } from './Parseliasse';
import { expect } from 'chai';
import { UrlsInterface } from '../dist/interfaces/Urls.interface';
describe('[ParsEliasse] Test suite for main ParsEliasse Module', () => {
    let parseliasse: Parseliasse;

    beforeEach(() => {
        parseliasse = new Parseliasse();
    });
    
    it('ParsEliasse module should be able to initialize with correct parameters', () => {
        expect(parseliasse).not.null;
        expect(parseliasse).is.instanceOf(Parseliasse);
    });

    it('ParsEliasse module should be able to overwrite default urls',() => {
        const urls: UrlsInterface = {
            
        }
    });
});