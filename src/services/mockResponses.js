export const getTaxResponse = (query) => {
  const normalizedQuery = query.toLowerCase();
  
  // Common tax question responses
  if (normalizedQuery.includes('tax bracket') || normalizedQuery.includes('tax rate')) {
    return `Tax brackets in the United States for 2023 are progressive:
    
    For single filers:
    • 10% for income up to $11,000
    • 12% for income over $11,000 to $44,725
    • 22% for income over $44,725 to $95,375
    • 24% for income over $95,375 to $182,100
    • 32% for income over $182,100 to $231,250
    • 35% for income over $231,250 to $578,125
    • 37% for income over $578,125
    
    For married filing jointly:
    • 10% for income up to $22,000
    • 12% for income over $22,000 to $89,450
    • 22% for income over $89,450 to $190,750
    • 24% for income over $190,750 to $364,200
    • 32% for income over $364,200 to $462,500
    • 35% for income over $462,500 to $693,750
    • 37% for income over $693,750`;
  }
  
  if (normalizedQuery.includes('deduction') || normalizedQuery.includes('standard deduction')) {
    return `For 2023, the standard deduction amounts are:
    
    • Single or Married Filing Separately: $13,850
    • Married Filing Jointly: $27,700
    • Head of Household: $20,800
    
    Standard deduction reduces your taxable income. You can choose to take the standard deduction or itemize deductions, whichever gives you the greater tax benefit.`;
  }
  
  if (normalizedQuery.includes('credit') || normalizedQuery.includes('tax credit')) {
    return `Tax credits directly reduce the amount of tax you owe, dollar for dollar. Some common tax credits include:
    
    • Child Tax Credit: Up to $2,000 per qualifying child under 17
    • Earned Income Tax Credit: For low to moderate income workers 
    • American Opportunity Credit: Up to $2,500 per eligible student for education expenses
    • Lifetime Learning Credit: Up to $2,000 per tax return for education expenses
    • Child and Dependent Care Credit: Up to $3,000 for one qualifying person or $6,000 for two or more
    
    Credits are more valuable than deductions because they reduce taxes directly rather than just reducing taxable income.`;
  }
  
  // Default response if no specific matches
  return `I understand you're asking about "${query}". As a tax assistant, I can help with various tax-related questions including tax calculations, deductions, credits, filing status, and tax planning strategies. 

To give you the most accurate information, I'd need some more specific details. Could you provide more information about your question? For example, are you asking about a particular tax year, filing status, or specific tax situation?

Feel free to ask about tax brackets, deductions, credits, or how specific life events might affect your taxes.`;
};
