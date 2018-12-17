import { AmdtDerouleurModule } from './AmdtDerouleur.module';
import { expect } from 'chai';
import * as nock from 'nock';
import { AmdtDerouleurInterface, ParamsInterface, AmdtDerouleurRequestParams } from '../../interfaces';
import { amdtDerouleurFixture } from '../../fixtures/AmdtDerouleur.fixture';
import { doesNotReject } from 'assert';

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

    afterEach(() => {
        nock.cleanAll()
    });

    it('AmdtDerouleur should be able to initialize with partially overwritten parameters', () => {
        const params: ParamsInterface<AmdtDerouleurRequestParams>= {
            cronjob: false,
            url: 'http://www.framagit.org/',
            requestParams: {
                legislature: 16,
                bibard: 1337,
                limit: 100,
                page: 10,
                start: 40
            }
        }

        amdtDerouleurModule = new AmdtDerouleurModule(params);

        expect(amdtDerouleurModule.params.cronjob).false;
        expect(amdtDerouleurModule.params.url).to.equal('http://www.framagit.org/');
        expect(amdtDerouleurModule.params.requestParams.bibard).to.equal(1337);
        expect(amdtDerouleurModule.params.requestParams.organeAbrv).to.equal('AN');
        expect(amdtDerouleurModule.params.requestParams.legislature).to.equal(16);
        expect(amdtDerouleurModule.params.requestParams.limit).to.equal(100);
        expect(amdtDerouleurModule.params.requestParams.start).to.equal(40);
        expect(amdtDerouleurModule.params.requestParams.page).to.equal(10);
    });

    it('AmdtDerouleur should be able to initialize with full set of overwritten parameters', () => {
        const params: ParamsInterface<AmdtDerouleurRequestParams>= {
            cronjob: false,
            url: 'http://www.framagit.org/',
            requestParams: {
                legislature: 16,
                bibard: 1337,
                limit: 100,
                page: 10,
                organeAbrv: 'SE',
                start: 40,
                startPosition: 1,
                endPosition: 50
            }
        }

        amdtDerouleurModule = new AmdtDerouleurModule(params);

        expect(amdtDerouleurModule.params.cronjob).false;
        expect(amdtDerouleurModule.params.url).to.equal('http://www.framagit.org/');
        expect(amdtDerouleurModule.params.requestParams.bibard).to.equal(1337);
        expect(amdtDerouleurModule.params.requestParams.legislature).to.equal(16);
        expect(amdtDerouleurModule.params.requestParams.limit).to.equal(100);
        expect(amdtDerouleurModule.params.requestParams.start).to.equal(40);
        expect(amdtDerouleurModule.params.requestParams.page).to.equal(10);
        expect(amdtDerouleurModule.params.requestParams.organeAbrv).to.equal('SE');
        expect(amdtDerouleurModule.params.requestParams.startPosition).to.equal(1);
        expect(amdtDerouleurModule.params.requestParams.endPosition).to.equal(50);
        
        
    });

    it('AmdtDerouleurModule should have a prepare method that generates a parameters string for request with default parameters', () => {
        const params = amdtDerouleurModule.prepare(amdtDerouleurModule.params.requestParams);
        expect(params).not.null;
        expect(params).to.match(/\&bibardSuffixe\=/);
        expect(params).to.match(/legislature=[0-9]{1,3}/);
        expect(params).to.match(/\&bibard\=[0-9]{1,9}/);
        expect(params).to.match(/\&organeAbrv=[a-zA-Z]{1,5}/);
    });

    it('AmdtDerouleur should be able to fetch data', (done) => {
        
        const scope = nock(amdtDerouleurModule.params.url)
        .get(amdtDerouleurModule.prepare(amdtDerouleurModule.params.requestParams))
        .reply(200,amdtDerouleurFixture);
    
        amdtDerouleurModule.fetch().then((response: Array<AmdtDerouleurInterface>) => {
            expect(response).not.null;
            expect(response.length).greaterThan(1);
            expect(response[0].numero).to.equal('1029');
            expect(response[0].auteurGroupe).to.equal("NI");
            expect(response[1].auteurLabel).to.equal("M. CIOTTI");
            done();
        });
    });

    it('AmdtDerouleur should be able to start a running job', () => {
        amdtDerouleurModule.startjob(amdtDerouleurModule.fetch, 60);
        expect(amdtDerouleurModule.cron).not.null;
    });
    
    it('AmdtDerouleur should be able to start and stop a running job', () => {
        amdtDerouleurModule.startjob(amdtDerouleurModule.fetch, 60);
        expect(amdtDerouleurModule.cron).not.null;
        amdtDerouleurModule.stopjob();
        expect(amdtDerouleurModule.cron).null;
    });

    it('AmdtDerouleur observe should return fetched data', (done) => {
        let observedData: Array<AmdtDerouleurInterface>;
        
        const scope = nock(amdtDerouleurModule.params.url)
        .get(amdtDerouleurModule.prepare(amdtDerouleurModule.params.requestParams))
        .reply(200,amdtDerouleurFixture);
    
    
        amdtDerouleurModule.observe().subscribe(
            (data: Array<AmdtDerouleurInterface>) => {
                expect(data.length).equal(amdtDerouleurFixture.length);
                done();
            }  ,
            error => console.error(error)
        );

        amdtDerouleurModule.fetch();
    });
});