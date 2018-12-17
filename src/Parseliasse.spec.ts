import { Parseliasse, ModulesParams } from './Parseliasse';
import { expect } from 'chai';
import { UrlsInterface } from './interfaces/Urls.interface';
import { AmdtDerouleurModule, AmendementModule, DiscussionModule, ProchainADiscuterModule } from './modules';
import {  } from './modules/Amendement/Amendement.module';
import { beforeEach } from 'mocha';
import { ProchainADiscuterInterface } from '../dist/interfaces/ProchainADiscuter.interface';
import { AmendementsFixture } from './fixtures/Amendement.fixture';
import nock = require('nock');
import { AmendementsInterface } from './interfaces';
import { amdtDerouleurFixture } from './fixtures/AmdtDerouleur.fixture';
import { AmdtDerouleurInterface } from '../dist/interfaces/AmdtDerouleur.interface';
import { discussionFixture } from './fixtures/Discussion.fixture';
import { DiscussionInterface } from '../dist/interfaces/Discussion.interface';

describe('[ParsEliasse] Test suite for main ParsEliasse Module', () => {
    
    describe('[ParsEliasse] Test suite with default parameters', () => {
        let parseliasse: Parseliasse;

        beforeEach(() => {
            parseliasse = new Parseliasse();
        });

        afterEach(() => {
            nock.cleanAll()
        });

        it('ParsEliasse module should be able to initialize with correct parameters', () => {
            expect(parseliasse).not.null;
            expect(parseliasse).is.instanceOf(Parseliasse);
        });

        it('ParsEliasse submodules initializes correctly', () => {
            expect(parseliasse.amdtDerouleur).is.instanceOf(AmdtDerouleurModule);
            expect(parseliasse.amendement).is.instanceOf(AmendementModule);
            expect(parseliasse.prochainADiscuter).is.instanceOf(ProchainADiscuterModule);
            expect(parseliasse.discussion).is.instanceOf(DiscussionModule);
        });

        it('AmendementModule as a submodule should be able to have an accessible fetch method', (done) => {
            
            var scope = nock('http://eliasse.assemblee-nationale.fr/eliasse/amendement.do')
            .get(parseliasse.amendement.prepare(parseliasse.amendement.params.requestParams) + '&numAmdt=100')
            .reply(200,AmendementsFixture);
            
            parseliasse.amendement.fetch(100).then((response: AmendementsInterface) => {
                expect(response.amendements.length).to.greaterThan(2);
                expect(response.amendements[0].etat).to.equal('DI');
                done();
            });
        });

        it('AmendementModule as a submodule should be able to have an accessible observe method', (done) => {
            var scope = nock('http://eliasse.assemblee-nationale.fr/eliasse/amendement.do')
            .get(parseliasse.amendement.prepare(parseliasse.amendement.params.requestParams) + '&numAmdt=100')
            .reply(200,AmendementsFixture);
            
            parseliasse.amendement.observe().subscribe((response: AmendementsInterface) => {
                expect(response.amendements.length).to.greaterThan(2);
                expect(response.amendements[0].etat).to.equal('DI');
                done();
            });

            parseliasse.amendement.fetch(100);
        });
        
        it('AmdtDerouleurModule as a submodule should be able to have an accessible fetch method', (done) => {
            
            var scope = nock('http://eliasse.assemblee-nationale.fr/eliasse/amdtDerouleur.do')
            .get(parseliasse.amdtDerouleur.prepare(parseliasse.amendement.params.requestParams))
            .reply(200,amdtDerouleurFixture);
            
            parseliasse.amdtDerouleur.fetch().then((response: Array<AmdtDerouleurInterface>) => {
                expect(response.length).to.greaterThan(2);
                expect(response[0].numero).to.equal("1029");
                done();
            });
        });

        it('AmdtDerouleurModule as a submodule should be able to have an accessible observe method', (done) => {
            var scope = nock('http://eliasse.assemblee-nationale.fr/eliasse/amdtDerouleur.do')
            .get(parseliasse.amdtDerouleur.prepare(parseliasse.amdtDerouleur.params.requestParams))
            .reply(200,amdtDerouleurFixture);
            
            parseliasse.amdtDerouleur.observe().subscribe((response: Array<AmdtDerouleurInterface>) => {
                expect(response.length).to.greaterThan(2);
                expect(response[0].numero).to.equal("1029");
                done();
            });

            parseliasse.amdtDerouleur.fetch();
        });

        it('DiscussionModule as a submodule should be able to have an accessible fetch method', (done) => {
            
            var scope = nock('http://eliasse.assemblee-nationale.fr/eliasse/discussion.do')
            .get(parseliasse.amdtDerouleur.prepare(parseliasse.amendement.params.requestParams))
            .reply(200,discussionFixture);
            
            parseliasse.discussion.fetch().then((response: DiscussionInterface) => {
                expect(response.amdtsParOrdreDeDiscussion.bibard).to.equal('1396');
                expect(response.amdtsParOrdreDeDiscussion.amendements.length).to.greaterThan(2);
                expect(response.amdtsParOrdreDeDiscussion.divisions.length).to.greaterThan(2);
              
                done();
            });
        });
    
        it('DiscussionModule as a submodule should be able to have an accessible observe method', (done) => {
            var scope = nock('http://eliasse.assemblee-nationale.fr/eliasse/discussion.do')
            .get(parseliasse.discussion.prepare(parseliasse.discussion.params.requestParams))
            .reply(200,discussionFixture);
            
            parseliasse.discussion.observe().subscribe((response: DiscussionInterface) => {
                expect(response.amdtsParOrdreDeDiscussion.bibard).to.equal('1396');
                expect(response.amdtsParOrdreDeDiscussion.amendements.length).to.greaterThan(2);
                expect(response.amdtsParOrdreDeDiscussion.divisions.length).to.greaterThan(2);
                done();
            });
    
            parseliasse.discussion.fetch();
        });

    });

   

    describe('[ParsEliasse] Test suite with overwritten parameters', () => {
        let parseliasse: Parseliasse;
 
        beforeEach(() => {

            const params : ModulesParams = {
                amendement: {
                    url: 'http://www.framagit.org',
                    cronjob: false
                },
                discussion: {
                    url: 'http://www.assemblee-nationale.fr',
                    cronjob: false
                },
                amdtDerouleur: {
                    url: 'http://www.theyseemerollin.io',
                    cronjob: false
                }
            };

            parseliasse = new Parseliasse(params);
         
        });

        afterEach(() => {
            nock.cleanAll()
        });

        it('ParsEliasse module should be able to initialize with correct parameters', () => {
            expect(parseliasse).not.null;
            expect(parseliasse).is.instanceOf(Parseliasse);
        });

        it('ParsEliasse module should have parameters overwritten', () => {
            
            expect(parseliasse.params.amendement.url).equal('http://www.framagit.org');
            expect(parseliasse.params.discussion.url).equal('http://www.assemblee-nationale.fr');
            expect(parseliasse.params.amdtDerouleur.url).equal('http://www.theyseemerollin.io');
        });
        
        it('ParsEliasse module should have its submodule to have overwritten parameters', () => {
            expect(parseliasse.amendement.params.url).equal('http://www.framagit.org');
            expect(parseliasse.discussion.params.url).equal('http://www.assemblee-nationale.fr');
            expect(parseliasse.amdtDerouleur.params.url).equal('http://www.theyseemerollin.io');
        });
    });

    describe('[ParsEliasse] Test suite with autoconfig parameters', () => {

        
        let parseliasse: Parseliasse;

        const prochainADiscuterResponse: ProchainADiscuterInterface  = {
            prochainADiscuter: {
                bibard: 9999,
                bibardSuffixe: null,
                numAmdt: '1',
                nbrAmdtRestant: '1/999',
                legislature: 99,
                organeAbrv: 'SE'
            }
        };


        beforeEach(() => {

            parseliasse = new Parseliasse();
            var scope = nock('http://eliasse.assemblee-nationale.fr/eliasse/prochainADiscuter.do')
            .get('')
            .reply(200,prochainADiscuterResponse);
        });

        afterEach(() => {
            nock.cleanAll()
        });

        it('ParsEliasse should have initialized submodules parameters with fixture response',(done) => {
            
            parseliasse.autoconfig().then(() => {
                // ensure bibard has been deployed to submodules
                expect(parseliasse.amdtDerouleur.params.requestParams.bibard).to.equal(prochainADiscuterResponse.prochainADiscuter.bibard);
                expect(parseliasse.discussion.params.requestParams.bibard).to.equal(prochainADiscuterResponse.prochainADiscuter.bibard);
                expect(parseliasse.amendement.params.requestParams.bibard).to.equal(prochainADiscuterResponse.prochainADiscuter.bibard);
                
                expect(parseliasse.amdtDerouleur.params.requestParams.legislature).to.equal(prochainADiscuterResponse.prochainADiscuter.legislature);
                expect(parseliasse.discussion.params.requestParams.legislature).to.equal(prochainADiscuterResponse.prochainADiscuter.legislature);
                expect(parseliasse.amendement.params.requestParams.legislature).to.equal(prochainADiscuterResponse.prochainADiscuter.legislature);
                
                done();
            });
        });

        it('Parseliasse should have initialized submodules parameters with fixture response even if provided with custom parameters', (done) => {
                const customParams: ModulesParams = {
                    amendement: {
                        url: 'http://www.framagit.org',
                        cronjob: false
                    },
                    discussion: {
                        url: 'http://www.assemblee-nationale.fr',
                        cronjob: true
                    },
                    amdtDerouleur: {
                        url: 'http://www.theyseemerollin.io',
                        cronjob: false
                    }
                };

                parseliasse = new Parseliasse(customParams);
                parseliasse.autoconfig().then(() => {
                    // ensure bibard has been deployed to submodules
                    expect(parseliasse.amdtDerouleur.params.requestParams.bibard).to.equal(prochainADiscuterResponse.prochainADiscuter.bibard);
                    expect(parseliasse.discussion.params.requestParams.bibard).to.equal(prochainADiscuterResponse.prochainADiscuter.bibard);
                    expect(parseliasse.amendement.params.requestParams.bibard).to.equal(prochainADiscuterResponse.prochainADiscuter.bibard);
                    
                    expect(parseliasse.amdtDerouleur.params.requestParams.legislature).to.equal(prochainADiscuterResponse.prochainADiscuter.legislature);
                    expect(parseliasse.discussion.params.requestParams.legislature).to.equal(prochainADiscuterResponse.prochainADiscuter.legislature);
                    expect(parseliasse.amendement.params.requestParams.legislature).to.equal(prochainADiscuterResponse.prochainADiscuter.legislature);
                    
                    expect(parseliasse.discussion.params.cronjob).to.equal(true);
                    done();
                });
        });
    });
});