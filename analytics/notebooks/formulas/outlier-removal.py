import pandas as pd
import numpy as np

def get_threshold(x, k=30):
    # StdDev ~ 1.4826 * median(|lowerX[i] - M|)
    C = 1.4826
    M = np.median(x)

    # lowerX = {x | x e X & <= M} 
    lower_x = x[x <= M]
    # MAD(lower) = C * median(|lowerX[i] - M|)
    mad_lower = C * np.median(np.abs(lower_x - np.median(x)))
    lower_threshold = M - k * mad_lower

    # upperX = {x | x e X & >= M}
    upper_x = x[x >= M]
    # mad(upper) = C * median(|upperX[i] - M|)
    mad_upper = C * np.median(np.abs(upper_x - np.median(x)))
    upper_threshold = M + k * mad_upper

    return lower_threshold, upper_threshold

# Example usage
# if __name__ == "__main__":    
#     q25 = harrell_davis_quantile(df['value'], 0.25)
#     q75 = harrell_davis_quantile(df['value'], 0.75)
    
#     df = remove_outliers(df, 'value')


