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

    it('ProchainADiscuterModule should be able to initialize', () => {
        expect(prochainADiscuterModule).to.instanceOf(ProchainADiscuterModule);
    });

    it('ProchainADiscuterModule should have initialized parameters', () => {
        const prochainADiscuterModule: ProchainADiscuterModule = new ProchainADiscuterModule();
        
        expect(prochainADiscuterModule).not.null;
        expect(prochainADiscuterModule.params.url).to.be.equal('http://eliasse.assemblee-nationale.fr/eliasse/prochainADiscuter.do');
    });

    afterEach(() => {
        nock.cleanAll()
    });
    
    it('ProchainADiscuterModule should be able to fetch data', () => {
        const scope = nock(prochainADiscuterModule.params.url)
        .get('')
        .reply(200,ProchainADiscuterFixture);

        prochainADiscuterModule.fetch().then((response: ProchainADiscuterInterface) => {
            expect(response).not.null;
        });
    });

    it('ProchainADiscuterModule observe should return fetched data', () => {
        let observedData: ProchainADiscuterInterface;

        const scope = nock(prochainADiscuterModule.params.url)
        .get('')
        .reply(200,ProchainADiscuterFixture);

        prochainADiscuterModule.observe().subscribe(
            (data: ProchainADiscuterInterface) => observedData = data,
            error => console.error(error),
            () => {
                expect(observedData).to.equal(ProchainADiscuterFixture);
            }     
        )
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