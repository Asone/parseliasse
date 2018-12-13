
import { AmendementModule } from './Amendement.module';
import { AmendementsFixture } from '../../fixtures/Amendement.fixture';

import { expect } from 'chai';
import * as nock from 'nock';
import { AmendementInterface, AmendementsInterface } from '../../interfaces/Amendement.interface';
describe('[Amendement] Test suite for Amendement module',()=> {
    
    let amendementModule: AmendementModule;

    beforeEach(() => {

        amendementModule = new AmendementModule({requestParams:{numAmdt: [1,2,3]}});
    });

    it('AmendementModule should be able to initialize', () => {
        
        expect(amendementModule).to.instanceof(AmendementModule);
    });

    it('AmendementModule should have initialized parameters', () => {
        const amendementModule: AmendementModule = new AmendementModule();
        
        expect(amendementModule).not.null;
        expect(amendementModule.params.url).to.be.equal('http://eliasse.assemblee-nationale.fr/eliasse/amendement.do');
    });

    it('Amendement Module should be able to fetch data', () => {

        const scope = nock(amendementModule.params.url)
        .get(amendementModule.prepare(amendementModule.params.requestParams))
        .reply(200,AmendementsFixture);

        amendementModule.fetch().then((response: AmendementsInterface) => {
            expect(response).not.null;
            expect(response.amendements.length).greaterThan(1);
        });

    });

});