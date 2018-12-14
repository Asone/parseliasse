
import { AmendementModule } from './Amendement.module';
import { AmendementsFixture } from '../../fixtures/Amendement.fixture';

import { expect } from 'chai';
import * as nock from 'nock';
import { AmendementInterface, AmendementsInterface } from '../../interfaces/Amendement.interface';
import { isAbsolute } from 'path';
describe('[AmendementModule] Test suite for Amendement module',()=> {
    
    let amendementModule: AmendementModule;
    describe('[AmendementModule] Test suite for Amendement Module with numAmdt requestParam as an array of numbers',() => {
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
    
        it('AmendementModule should be able to initialize with partially overwritten parameters', () => {
    
        });
    
        it('AmendementModule should be able to initialize with fully overwritten parameters', () => {
    
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
    
});