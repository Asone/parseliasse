
import { AmendementModule } from './Amendement.module';
import { AmendementsFixture } from '../../fixtures/Amendement.fixture';

import { expect } from 'chai';
import * as nock from 'nock';
import { AmendementInterface, AmendementsInterface } from '../../interfaces/Amendement.interface';
import { isAbsolute } from 'path';
import { ParamsInterface, AmendementRequestParams } from '../../../dist/interfaces/Params.interface';
describe('[AmendementModule] Test suite for Amendement module',()=> {
    
    let amendementModule: AmendementModule;
    describe('[AmendementModule] Test suite for Amendement Module with numAmdt requestParam as an array of numbers',() => {
        beforeEach(() => {

            amendementModule = new AmendementModule({requestParams:{numAmdt: [1,2,3]}});
        });
    
        afterEach(() => {
            nock.cleanAll()
        });
        
        it('AmendementModule should be able to initialize', () => {
            
            expect(amendementModule).to.instanceof(AmendementModule);
        });
    
        it('AmendementModule should have initialized parameters', () => {
            const amendementModule: AmendementModule = new AmendementModule();
            
            expect(amendementModule).not.null;
            expect(amendementModule.params.url).to.be.equal('http://eliasse.assemblee-nationale.fr/eliasse/amendement.do');
        });
    
        it('AmendementModule should be able to initialize with partially overwritten parameters', () => {
            const params: ParamsInterface<AmendementRequestParams> = {
                url: 'http://www.pwet.info'
            };

            amendementModule = new AmendementModule(params);
            expect(amendementModule.params.url).to.equal('http://www.pwet.info');
        });
    
        it('AmendementModule should be able to initialize with fully overwritten parameters', () => {
    
        });

        it('AmendementModule should have a prepare method that generates a parameters string for request with default parameters', () => {
            const params = amendementModule.prepare(amendementModule.params.requestParams);
            expect(params).not.null;
            expect(params).to.match(/\&bibardSuffixe\=/);
            expect(params).to.match(/legislature=[0-9]{1,3}/);
            expect(params).to.match(/\&bibard\=[0-9]{1,9}/);
            expect(params).to.match(/\&organeAbrv=[a-zA-Z]{1,5}/);
        });

        it('AmendementModule should be able to fetch data', () => {
    
            const scope = nock(amendementModule.params.url)
            .get(amendementModule.prepare(amendementModule.params.requestParams))
            .reply(200,AmendementsFixture);
    
            amendementModule.fetch().then((response: AmendementsInterface) => {
                expect(response).not.null;
                expect(response.amendements.length).greaterThan(1);
            });
        });
    
        it('AmdtDerouleur observe should return fetched data', () => {
            let observedData: AmendementsInterface;
            
            const scope = nock(amendementModule.params.url)
            .get(amendementModule.prepare(amendementModule.params.requestParams))
            .reply(200,amendementModule);
        
        
            amendementModule.observe().subscribe(
                (data: AmendementsInterface) => observedData = data,
                error => console.error(error),
                () => {
                    expect(observedData).to.equal(amendementModule);
                }  
            );
    
            amendementModule.fetch();
        });
    
        it('AmendementModule should be able to start a running job', () => {
            amendementModule.startjob(amendementModule.fetch, 60);
            expect(amendementModule.cron).not.null;
        });
    
        it('AmendementModule should be able to start and stop a running job', () => {
            amendementModule.startjob(amendementModule.fetch, 60);
            amendementModule.stopjob();
            expect(amendementModule.cron).null
        });
    
    });
    
    describe('[AmendementModule] Test suite for Amendement Module with numAmdt requestParam as a single number',() => {
        beforeEach(() => {

            amendementModule = new AmendementModule({requestParams:{numAmdt: 42}});
        });

        afterEach(() => {
            nock.cleanAll()
        });

        it('AmendementModule should be able to initialize', () => {
            
            expect(amendementModule).to.instanceof(AmendementModule);
        });
    
        it('AmendementModule should have initialized parameters', () => {
            const amendementModule: AmendementModule = new AmendementModule();
            
            expect(amendementModule).not.null;
            expect(amendementModule.params.url).to.be.equal('http://eliasse.assemblee-nationale.fr/eliasse/amendement.do');
        });
    
        it('AmendementModule should be able to initialize with partially overwritten parameters', () => {
    
        });
    
        it('AmendementModule should be able to initialize with fully overwritten parameters', () => {
    
        });

        it('AmendementModule should throw an exception if no numAmdt is provided', () => {
    
            const scope = nock(amendementModule.params.url)
            .get(amendementModule.prepare(amendementModule.params.requestParams))
            .reply(200,AmendementsFixture);
            amendementModule.params.requestParams.numAmdt = undefined;

            expect(() => { amendementModule.fetch() }).to.throw('requestParams.numAmdt can\'t be null. number or array of numbers must be provided.');
            
        });

        it('AmendementModule should be able to fetch data', (done) => {
    
            const scope = nock(amendementModule.params.url)
            .get(amendementModule.prepare(amendementModule.params.requestParams))
            .reply(200,AmendementsFixture);
    
            amendementModule.fetch().then((response: AmendementsInterface) => {
                expect(response).not.null;
                expect(response.amendements.length).greaterThan(1);
                done();
            });
        });
    
        it('AmdtDerouleur observe should return fetched data', (done) => {
            let observedData: AmendementsInterface;
            
            const scope = nock(amendementModule.params.url)
            .get(amendementModule.prepare(amendementModule.params.requestParams))
            .reply(200,AmendementsFixture);
        
        
            amendementModule.observe().subscribe(
                (data: AmendementsInterface) => {
                    expect(data.amendements.length).equal(AmendementsFixture.amendements.length);
                    done();
                },
                error => console.error(error)
            );
    
            amendementModule.fetch();
        });
    
        it('AmendementModule should be able to start a running job', () => {
            amendementModule.startjob(amendementModule.fetch, 60);
            expect(amendementModule.cron).not.null;
        });
    
        it('AmendementModule should be able to start and stop a running job', () => {
            amendementModule.startjob(amendementModule.fetch, 60);
            expect(amendementModule).not.null;
            amendementModule.stopjob();
            expect(amendementModule.cron).null;
        });
    
    });
    
});