
import { AmendementModule } from './Amendement.module';
import { AmendementsFixture } from '../../fixtures/Amendement.fixture';

import { expect } from 'chai';
import * as nock from 'nock';
import { AmendementInterface, AmendementsInterface } from '../../interfaces/Amendement.interface';
describe('[Amendement] Test suite for Amendement module',()=> {
 
    it('AmendementModule should be able to initialize', () => {
        
        const amendementModule: AmendementModule = new AmendementModule();
        expect(amendementModule).to.instanceof(AmendementModule);
    });

    it('AmendementModule should have initialized parameters', () => {
        const amendementModule: AmendementModule = new AmendementModule();
        
        expect(amendementModule).not.null;
        expect(amendementModule.params.url).to.be.equal('http://eliasse.assemblee-nationale.fr/eliasse/amendement.do');
    });

    it('Amendement Module should be able to fetch data', () => {
        const amendementModule: AmendementModule = new AmendementModule();

        const scope = nock(amendementModule.params.url)
        .get(amendementModule.prepare(amendementModule.params.requestParams))
        .reply(200,AmendementsFixture);

        amendementModule.fetch().then((response: AmendementsInterface) => {
            expect(response).not.null;
            expect(response.amendements.length).greaterThan(1);
        });

    });

});