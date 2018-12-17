import { expect } from 'chai';
import { DiscussionModule } from './Discussion.module';
import { DiscussionInterface } from '../../interfaces/Discussion.interface';
import { discussionFixture } from '../../fixtures/Discussion.fixture';
import nock = require('nock');

describe('[Discussion] Test suite for Discussion module',()=> {
    let discussionModule: DiscussionModule;

    beforeEach(() => {
        discussionModule = new DiscussionModule();
    });

    it('DiscussionModule should be able to initialize', () => {
        expect(discussionModule).to.instanceOf(DiscussionModule);
    });

    it('DiscussionModule should have initialized parameters', () => {
        expect(discussionModule).not.null;
        expect(discussionModule.params.url).to.be.equal('http://eliasse.assemblee-nationale.fr/eliasse/discussion.do');
    });

    it('DiscussionModule should have a prepare method that generates a parameters string for request with default parameters', () => {
        const params = discussionModule.prepare(discussionModule.params.requestParams);
        expect(params).not.null;
        expect(params).to.match(/\&bibardSuffixe\=/);
        expect(params).to.match(/legislature=[0-9]{1,3}/);
        expect(params).to.match(/\&bibard\=[0-9]{1,9}/);
        expect(params).to.match(/\&organeAbrv=[a-zA-Z]{1,5}/);
        
    });

    it('DiscussionModule should have a prepare method that generates a parameters string for request with full set of parameters', () => {
        discussionModule.params.requestParams.numAmdt = 42;
        discussionModule.params.requestParams.page = 1;
        discussionModule.params.requestParams.start = 0;
        discussionModule.params.requestParams.limit = 10;
        const params = discussionModule.prepare(discussionModule.params.requestParams);
        expect(params).not.null;
    });

    it('DiscussionModule should have a prepare method that generates a parameters string for request', () => {
        const params = discussionModule.prepare(discussionModule.params.requestParams);
        expect(params).not.null;
    });
    
    it('DiscussionModule should have a prepare method that generates a parameters string for request with a single number for numAmdt', () => {
        discussionModule.params.requestParams.numAmdt = 42;
        
        const params = discussionModule.prepare(discussionModule.params.requestParams);
        expect(params).not.null;
    });

    it('DiscussionModule should have a prepare method that generates a parameters string for request with an array for numAmdt', () => {
        discussionModule.params.requestParams.numAmdt = [1,2,3];

        const params = discussionModule.prepare(discussionModule.params.requestParams);
        expect(params).not.null;
    });


    it('DiscussionModule should be able to fetch data with default parameters', () => {
        const scope = nock(discussionModule.params.url)
        .get(discussionModule.prepare(discussionModule.params.requestParams))
        .reply(200,discussionFixture);

        discussionModule.fetch().then((response: DiscussionInterface) => {
            expect(response).not.null;
            expect(response.amdtsParOrdreDeDiscussion.divisions.length).greaterThan(1);
        });
    });

    it('DiscussionModule should be able to fetch data with numAmdt as single number in parameters', () => {
        discussionModule.params.requestParams.numAmdt = 42;
        
        const scope = nock(discussionModule.params.url)
        .get(discussionModule.prepare(discussionModule.params.requestParams))
        .reply(200,discussionFixture);

        discussionModule.fetch().then((response: DiscussionInterface) => {
            expect(response).not.null;
            expect(response.amdtsParOrdreDeDiscussion.divisions.length).greaterThan(1);
        });
    });

    it('DiscussionModule should be able to fetch data with numAmdt as array of numbers in parameters', (done) => {
        discussionModule.params.requestParams.numAmdt = [1,2,4];
        
        const scope = nock(discussionModule.params.url)
        .get(discussionModule.prepare(discussionModule.params.requestParams))
        .reply(200,discussionFixture);

        discussionModule.fetch().then((response: DiscussionInterface) => {
            expect(response).not.null;
            expect(response.amdtsParOrdreDeDiscussion.divisions.length).greaterThan(1);
            done();
        });
    });


    it('DiscussionModule should be able to fetch data with a full set parameters', (done) => {
        discussionModule.params.requestParams.numAmdt = 42;
        discussionModule.params.requestParams.page = 1;
        discussionModule.params.requestParams.start = 0;
        discussionModule.params.requestParams.limit = 10;
        
        const scope = nock(discussionModule.params.url)
        .get(discussionModule.prepare(discussionModule.params.requestParams))
        .reply(200,discussionFixture);

        discussionModule.fetch().then((response: DiscussionInterface) => {
            expect(response).not.null;
            expect(response.amdtsParOrdreDeDiscussion.divisions.length).greaterThan(1);
            done();
        });
    });


    it('DiscussionModule should be able to start a running job', () => {
        discussionModule.startjob(discussionModule.fetch,60);
        
        expect(discussionModule.cron).not.null;
    });

    it('DiscussionModule should be able to start and stop a running job', () => {
        discussionModule.startjob(discussionModule.fetch,60);
        expect(discussionModule.cron).not.null;
        discussionModule.stopjob();
        expect(discussionModule.cron).null;
    });

    it('DiscussionModule observe should return fetched data', () => {
        let observedData: DiscussionInterface;
        
        const scope = nock(discussionModule.params.url)
        .get(discussionModule.prepare(discussionModule.params.requestParams))
        .reply(200,discussionFixture);

        discussionModule.observe().subscribe(
            (data: DiscussionInterface) => observedData = data,
            error => console.error(error),
            () => {
                expect(observedData).to.equal(discussionFixture);
            }
        );
    });
});