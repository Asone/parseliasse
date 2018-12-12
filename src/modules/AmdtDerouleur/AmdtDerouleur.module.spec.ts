import { AmdtDerouleurModule } from './AmdtDerouleur.module';
import { expect } from 'chai';
import * as nock from 'nock';
import { AmdtDerouleurInterface } from '../../interfaces/AmdtDerouleur.interface';
import { amdtDerouleurFixture } from '../../fixtures/AmdtDerouleur.fixture';

describe('[AmdtDerouleur] Test suite for AmdtDerouleur module',()=> {
    
    let amdtDerouleurModule: AmdtDerouleurModule;

    beforeEach(() => {
        amdtDerouleurModule = new AmdtDerouleurModule();
    });

    it('AmdtDerouleur should be able to initialize', () => {
        expect(amdtDerouleurModule).to.instanceof(AmdtDerouleurModule);
    });

    it('AmdtDerouleur should have initialized parameters', () => {
        expect(amdtDerouleurModule).not.null;
        expect(amdtDerouleurModule.params.url).to.be.equal('http://eliasse.assemblee-nationale.fr/eliasse/amdtDerouleur.do');
    });


    it('AmdtDerouleur should be able to fetch data', () => {
        
        const scope = nock(amdtDerouleurModule.params.url)
        .get(amdtDerouleurModule.prepare(amdtDerouleurModule.params.requestParams))
        .reply(200,amdtDerouleurFixture);
    
        amdtDerouleurModule.fetch().then((response: Array<AmdtDerouleurInterface>) => {
            expect(response).not.null;
            expect(response.length).greaterThan(1);
            expect(response[0].numero).to.equal('1029');
            expect(response[0].auteurGroupe).to.equal("NI");
            expect(response[1].auteurLabel).to.equal("M. CIOTTI");
        });
    });

    it('AmdtDerouleur should be able to start a running job', () => {
        amdtDerouleurModule.startjob(amdtDerouleurModule.fetch, 60);
        expect(amdtDerouleurModule.cron).not.null
    });
    
    // it('AmdtDerouleur should be able to start and stop a running job', () => {
    //     amdtDerouleurModule.startjob(amdtDerouleurModule.fetch, 60);
    //     amdtDerouleurModule.stopjob();
    //     expect(amdtDerouleurModule.cron).null
    // });

    it('AmdtDerouleur observe should return fetched data', () => {
        let observedData: Array<AmdtDerouleurInterface>;
        
        const scope = nock(amdtDerouleurModule.params.url)
        .get(amdtDerouleurModule.prepare(amdtDerouleurModule.params.requestParams))
        .reply(200,amdtDerouleurFixture);
    
    
        amdtDerouleurModule.observe().subscribe(
            (data: Array<AmdtDerouleurInterface>) => observedData = data,
            error => console.error(error),
            () => {
                expect(observedData).to.equal(amdtDerouleurFixture);
            }  
        );

        amdtDerouleurModule.fetch();
    });
});