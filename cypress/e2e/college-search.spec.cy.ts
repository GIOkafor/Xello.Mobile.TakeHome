describe('College search spec', () => {
  it('loads the college list page', () => {
    cy.visit('/');
    cy.get('h1').contains(/college list/i).should('exist');
    cy.get('table').should('exist');
    // Check that the table has at least one row of data (excluding header)
    cy.get('table tbody tr').should('have.length.greaterThan', 0);
  });

  it('should filter the results correctly', () => {
    cy.visit('/');
    cy.get('.form-control').type('12121');
    //table should have only one result
    cy.get('table tbody tr').should('have.length', 1);

    cy.get('.form-control').clear();
    cy.get('.form-control').type('2540');
    //table should have only one result
    cy.get('table tbody tr').should('have.length', 3);

    //should show an error message when filter doesn't return any values
    cy.get('.form-control').clear();
    cy.get('.form-control').type('red');
    //table should no result
    cy.get('table tbody tr').should('have.length', 0) && cy.get('.alert').should('contain.text', 'No college exists with that name.');
  });

  it('should sort the data in the tables correctly when a user clicks', () => {
    cy.visit('/');

    // Initial: check first row's ID (should be sorted by id ascending by default)
    cy.get('table tbody tr').first().find('td[data-label="Id"]').invoke('text').then((firstIdBefore) => {
      // Click on "Name" header to sort by name ascending
      cy.get('thead > tr > :nth-child(2)').click();

      // Wait for table to update and check first row's Name
      cy.get('table tbody tr').first().find('td[data-label="Name"]').invoke('text').then((firstNameAsc) => {
        // Click again to sort by name descending
        cy.get('thead > tr > :nth-child(2)').click();

        // Wait for table to update and check first row's Name again
        cy.get('table tbody tr').first().find('td[data-label="Name"]').invoke('text').then((firstNameDesc) => {
          // The name should be different after toggling sort direction
          expect(firstNameAsc).not.to.eq(firstNameDesc);
        });
      });

      // Now click on "Num Students" header to sort by numStudents ascending
      cy.get('thead > tr > :nth-child(5)').click();

      cy.get('table tbody tr').first().find('td[data-label="Num Students"]').invoke('text').then((firstNumStudentsAsc) => {
        // Click again to sort by numStudents descending
        cy.get('thead > tr > :nth-child(5)').click();

        cy.get('table tbody tr').first().find('td[data-label="Num Students"]').invoke('text').then((firstNumStudentsDesc) => {
          // The value should be different after toggling sort direction
          expect(firstNumStudentsAsc).not.to.eq(firstNumStudentsDesc);
        });
      });
    });
  });

  it('should refresh results when refresh button is clicked', () => {
    cy.visit('/');

    // Filter by a name
    cy.get('.form-control').type('543');
    cy.get('table tbody tr').should('have.length.greaterThan', 0);

    // Sort by Name
    cy.get('thead > tr > :nth-child(2)').click();

    // Sort by Num Students
    cy.get('thead > tr > :nth-child(5)').click();

    // Clear filter
    cy.get('.form-control').clear();

    // Filter by a number
    cy.get('.form-control').type('2540');
    cy.get('table tbody tr').should('have.length.greaterThan', 0);

    // Sort by Id
    cy.get('thead > tr > :nth-child(1)').click();

    // Store current table content for comparison
    cy.get('table tbody').invoke('text').then((tableBeforeRefresh) => {
      // Click the refresh button
      cy.get('[data-cy="refreshBtn"]').click();

      // After refresh, table should be reset to default state
      cy.get('table tbody').should('not.have.text', tableBeforeRefresh);

      // Optionally, check that filter is cleared and table is reset
      cy.get('.form-control').should('have.value', '');
      cy.get('table tbody tr').should('have.length.greaterThan', 0);
    });
  });

  it('should navigate to the details page for the clicked college', () => {
    const collegeId = '24343';
    cy.visit('/');
    cy.get('.form-control').type(collegeId);
    cy.get('table tbody tr').click();
    cy.get('h2').should('contain.text', collegeId);
    cy.get('[data-test="collegeId"]').should('contain.text', collegeId);
    cy.get('[data-test="city"]').should('contain.text', 'Carter');
    cy.get('[data-test="state"]').should('contain.text', 'OH');
    cy.get('[data-test="numStudents"]').should('contain.text', 14563);
    cy.get('[data-test="numMajors"]').should('contain.text', 32);
    cy.get('[data-test="hasSports"]').should('contain.text', 'No');
  });

  it('should navigate to a result and back to the list view', () => {
    const collegeId = '24343';
    cy.visit('/');
    cy.get('.form-control').type(collegeId);
    cy.get('table tbody tr').click();
    cy.get('h2').should('contain.text', collegeId);
    //go back using button
    cy.get('[data-cy="backBtn"]').click();
    cy.get('table tbody tr').should('have.length.greaterThan', 0);
  });
});