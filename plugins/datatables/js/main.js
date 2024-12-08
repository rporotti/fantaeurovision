$(document).ready(function() {
  var table = $('#data').DataTable( {
      rowReorder: {
          selector: 'td:nth-child(1)'
      },
      responsive: true
  } );
} );