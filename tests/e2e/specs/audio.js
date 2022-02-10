describe('Audio Player', () => {
  it('plays audio', () => {
    cy.visit('/')
    cy.wait(1000)
    cy.get('.composition-name:first').click()
    cy.get('#playBtn').click()
    cy.wait(5000)
    cy.get('#playerPlayBtn').click()
  })
})
