"""
Data cleaning utilities for pandas DataFrames.
Contains functions to clean and standardize CSV data.
"""

import pandas as pd


def fill_missing_values(df):
    """
    Fill NaN values with appropriate defaults based on column data type.
    
    Args:
        df (pd.DataFrame): Input DataFrame to clean
        
    Returns:
        pd.DataFrame: DataFrame with missing values filled
    """
    # Create a copy to avoid modifying the original DataFrame
    cleaned_df = df.copy()
    
    # Iterate through each column
    for column in cleaned_df.columns:
        # Check if column has any missing values
        if cleaned_df[column].isna().any():
            # Get the data type of the column
            dtype = cleaned_df[column].dtype
            
            # Fill based on data type
            if dtype == 'object':  # String/text columns
                cleaned_df[column] = cleaned_df[column].fillna('')
            else:  # Numeric columns (int, float, etc.)
                cleaned_df[column] = cleaned_df[column].fillna(0)
    
    return cleaned_df


def strip_whitespace(df):
    """
    Remove leading and trailing whitespace from string columns.
    
    Args:
        df (pd.DataFrame): Input DataFrame to clean
        
    Returns:
        pd.DataFrame: DataFrame with whitespace stripped from string columns
    """
    # Create a copy to avoid modifying the original DataFrame
    cleaned_df = df.copy()
    
    # Iterate through each column
    for column in cleaned_df.columns:
        # Check if column is string type (object dtype)
        if cleaned_df[column].dtype == 'object':
            # Apply string strip to each cell, handling NaN values
            cleaned_df[column] = cleaned_df[column].astype(str).str.strip()
            # Convert 'nan' strings back to actual NaN, then fill with empty string
            cleaned_df[column] = cleaned_df[column].replace('nan', '')
    
    return cleaned_df


def standardize_column_names(df):
    """
    Standardize column names by converting to lowercase and replacing spaces with underscores.
    
    Args:
        df (pd.DataFrame): Input DataFrame to clean
        
    Returns:
        pd.DataFrame: DataFrame with standardized column names
    """
    # Create a copy to avoid modifying the original DataFrame
    cleaned_df = df.copy()
    
    # Create new column names mapping
    new_columns = {}
    for column in cleaned_df.columns:
        # Convert to lowercase and replace spaces with underscores
        new_name = str(column).lower().replace(' ', '_')
        new_columns[column] = new_name
    
    # Rename columns using the mapping
    cleaned_df = cleaned_df.rename(columns=new_columns)
    
    return cleaned_df

