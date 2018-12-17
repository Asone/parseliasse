import { expect } from 'chai';
import { ProchainADiscuterModule } from './ProchainADiscuter.module';
import { ProchainADiscuterInterface } from '../../interfaces/ProchainADiscuter.interface';
import { ProchainADiscuterFixture } from '../../fixtures/ProchainADiscuter.fixture';
import nock = require('nock');

describe('[ProchainADiscuter] Test suite for ProchainADiscuter module',()=> {
    let prochainADiscuterModule: ProchainADiscuterModule;

    beforeEach(() => {
        prochainADiscuterModule = new ProchainADiscuterModule();
    });

    afterEach(() => {
        nock.cleanAll()
    });

    it('ProchainADiscuterModule should be able to initialize', () => {
        expect(prochainADiscuterModule).to.instanceOf(ProchainADiscuterModule);
    });

    it('ProchainADiscuterModule should have initialized parameters', () => {
        const prochainADiscuterModule: ProchainADiscuterModule = new ProchainADiscuterModule();
        
        expect(prochainADiscuterModule).not.null;
        expect(prochainADiscuterModule.params.url).to.be.equal('http://eliasse.assemblee-nationale.fr/eliasse/prochainADiscuter.do');
    });

    
    it('ProchainADiscuterModule should be able to fetch data', (done) => {
        const scope = nock(prochainADiscuterModule.params.url)
        .get('')
        .reply(200,ProchainADiscuterFixture);

        prochainADiscuterModule.fetch().then((response: ProchainADiscuterInterface) => {
            expect(response).not.null;
            done();
        });
    });

    it('ProchainADiscuterModule observe should return fetched data', (done) => {
        let observedData: ProchainADiscuterInterface;

        const scope = nock(prochainADiscuterModule.params.url)
        .get('')
        .reply(200,ProchainADiscuterFixture);

        prochainADiscuterModule.observe().subscribe(
            (data: ProchainADiscuterInterface) => {
                expect(data.prochainADiscuter.bibard).to.equal(ProchainADiscuterFixture.prochainADiscuter.bibard);
                expect(data.prochainADiscuter.legislature).to.equal(ProchainADiscuterFixture.prochainADiscuter.legislature);
                expect(data.prochainADiscuter.nbrAmdtRestant).to.equal(ProchainADiscuterFixture.prochainADiscuter.nbrAmdtRestant);
                expect(data.prochainADiscuter.organeAbrv).to.equal(ProchainADiscuterFixture.prochainADiscuter.organeAbrv);
                done();
            },
            error => console.error(error)  
        )

        prochainADiscuterModule.fetch();
    });

    it('ProchainADiscuterModule should be able to start a running job', () => {
        prochainADiscuterModule.startjob(prochainADiscuterModule.fetch, 60);
        expect(prochainADiscuterModule.cron).not.null;
    });

    it('ProchainADiscuterModule should be able to start and stop a running job', () => {
        prochainADiscuterModule.startjob(prochainADiscuterModule.fetch, 60);
        expect(prochainADiscuterModule.cron).not.null;
        prochainADiscuterModule.stopjob();
        expect(prochainADiscuterModule.cron).null;
    });


});