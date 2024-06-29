// cypress/e2e/favorite-restaurant.spec.js

describe('Favorite and Unfavorite Restaurant', () => {
    it('should be able to favorite a restaurant', () => {
      // Buka halaman detail restoran
      cy.visit('/#/detail/1');
  
      // Tunggu hingga tombol favorite muncul dan klik tombol tersebut
      cy.get('#favoriteButtonContainer').within(() => {
        cy.get('button').contains('Like').click();
      });
  
      // Verifikasi bahwa tombol berubah menjadi tombol unlike
      cy.get('#favoriteButtonContainer').within(() => {
        cy.get('button').contains('Unlike').should('be.visible');
      });
    });
  
    it('should be able to unfavorite a restaurant', () => {
      // Buka halaman detail restoran yang sudah difavoritkan
      cy.visit('/#/detail/1');
  
      // Tunggu hingga tombol unlike muncul dan klik tombol tersebut
      cy.get('#favoriteButtonContainer').within(() => {
        cy.get('button').contains('Unlike').click();
      });
  
      // Verifikasi bahwa tombol berubah menjadi tombol like
      cy.get('#favoriteButtonContainer').within(() => {
        cy.get('button').contains('Like').should('be.visible');
      });
    });
  });
  