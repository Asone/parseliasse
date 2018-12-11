import { Parseliasse, ModulesParams } from './Parseliasse';
import { expect } from 'chai';
import { UrlsInterface } from './interfaces/Urls.interface';
import { AmdtDerouleurModule, AmendementModule, DiscussionModule, ProchainADiscuterModule } from './modules';
import {  } from './modules/Amendement/Amendement.module';

describe('[ParsEliasse] Test suite for main ParsEliasse Module', () => {
    let parseliasse: Parseliasse;
    
    describe('[ParsEliasse] Test suite with default parameters', () => {
        
        beforeEach(() => {
            parseliasse = new Parseliasse();
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
    });

    describe('[ParsEliasse] Test suite with overriden parameters', () => {

        beforeEach(() => {

            const params : ModulesParams = {
                amendement: {
                    url: 'http://www.framagit.org',
                    cronjob: true
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
            parseliasse = new Parseliasse(params);
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
});