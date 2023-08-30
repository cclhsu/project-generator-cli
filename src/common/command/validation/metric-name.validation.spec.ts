import {
  isValidMetricName,
  validateMetricName,
  validateMetricNameDTO,
} from './metric-name.validation';

describe('validateMetricNameDTO', () => {
  it('should return true for a valid metric name', async () => {
    const metricName = 'XYZ Metric';
    const result = await validateMetricNameDTO(metricName);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid metric name format', async () => {
    const metricName = 'InvalidFormat';
    const result = await validateMetricNameDTO(metricName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid metric name format (e.g. XYZ Metric)',
      ),
    );
  });

  it('should return an error message for an invalid metric name prefix', async () => {
    const metricName = 'xyz5 metric';
    const result = await validateMetricNameDTO(metricName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid metric name format (e.g. XYZ Metric)',
      ),
    );
  });

  it('should return an error message for an invalid metric name suffix', async () => {
    const metricName = 'xyz metric5';
    const result = await validateMetricNameDTO(metricName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid metric name format (e.g. XYZ Metric)',
      ),
    );
  });
});

describe('isValidMetricName', () => {
  it('should return true for a valid metric name', () => {
    const metricName = 'XYZ Metric';
    const result = isValidMetricName(metricName);
    expect(result).toBe(true);
  });

  it('should return false for an invalid metric name format', () => {
    const metricName = 'InvalidFormat';
    const result = isValidMetricName(metricName);
    expect(result).toBe(false);
  });
});

describe('validateMetricName', () => {
  it('should return true for a valid metric name', async () => {
    const metricName = 'XYZ Metric';
    const result = await validateMetricName(metricName);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid metric name format', async () => {
    const metricName = 'InvalidFormat';
    const result = await validateMetricName(metricName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid metric name format (e.g. XYZ Metric)',
      ),
    );
  });

  it('should return an error message for an invalid metric name prefix', async () => {
    const metricName = 'xyz5 metric';
    const result = await validateMetricName(metricName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid metric name format (e.g. XYZ Metric)',
      ),
    );
  });

  it('should return an error message for an invalid metric name suffix', async () => {
    const metricName = 'xyz metric5';
    const result = await validateMetricName(metricName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid metric name format (e.g. XYZ Metric)',
      ),
    );
  });
});
