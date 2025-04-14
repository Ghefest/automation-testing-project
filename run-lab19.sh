docker run --rm -v $(pwd)/labs/lab19:/tests \
  justb4/jmeter \
  -n -t /tests/scenario.jmx \
  -p /tests/users.properties \
  -l /tests/results/results.jtl \
  -e -o /tests/results/report