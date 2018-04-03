'use strict';

var chai = require('chai');
chai.use(require('chai-things'));
var expect = chai.expect;
var groups = require('../groups.js');

describe('Groups', function() {
    beforeEach(function(done) {
       groups.removeAll(function(err) {
            if (err) {
                return done(err);
            }
            
            groups.add([{
                id: "100",
                name: "Prueba Grunt",
                responsable: "Paola Martinez",
                email: "pepe@pepe.com"
            }, {
                id: "99",
                name: "Mineria de datos",
                responsable: "David Felix",
                email: "luis@pepe.com"
            }], done);
        });
    });
    
    describe('#allGroups()', function() {
        it('should return all contacts', function(done) {
            groups.allGroups((err, res) => {
                if (err) {
                    return done(err);
                }
                
                expect(res).to.have.lengthOf(2);
                expect(res).to.contain.an.item.with.property('id', '100');
                expect(res).to.contain.an.item.with.property('id', '99');
                done();
            });
        });
    });
    
    describe('#remove()', function() {
        it('should remove the element', function(done) {
            groups.remove('100', (err) => {
                if (err) {
                    return done(err);
                }
                
                groups.allGroups((err,res) => {
                    if (err) {
                        return done(err);
                    }
                    
                    expect(res).to.have.lengthOf(1);
                    expect(res).not.to.contain.an.item.with.property('id', '100');
                    done();
                });
            });
        });
    });
});