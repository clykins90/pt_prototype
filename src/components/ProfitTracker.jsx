import React from 'react';
import { useState } from 'react';
import { Tabs, Tab, Paper, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Select, MenuItem, InputAdornment, Box, Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, Radio, RadioGroup, Accordion, AccordionSummary, AccordionDetails, IconButton, FormControl } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LinkIcon from '@mui/icons-material/Link';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#F5F6F7',
    minHeight: '100vh',
    padding: theme.spacing(3)
  },
  container: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(1)
  },
  section: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    '& > *': {
      marginBottom: theme.spacing(1)
    }
  },
  table: {
    marginTop: theme.spacing(1),
    '& .MuiTableCell-root': {
      padding: theme.spacing(1)
    }
  },
  invoiceSection: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    borderLeft: `4px solid ${theme.palette.primary.main}`
  },
  metricsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(3)
  },
  metricCard: {
    padding: theme.spacing(1.5),
    borderRadius: theme.spacing(1),
    backgroundColor: '#fff',
    boxShadow: 'none',
    border: '1px solid rgba(0, 0, 0, 0.12)'
  },
  metricValue: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
    '& .MuiTypography-h5': {
      fontWeight: 500,
      fontSize: '1.5rem',
      color: '#00847A'
    },
    '& .trend-up': {
      color: '#00847A'
    },
    '& .trend-down': {
      color: '#D63649'
    }
  },
  costSection: {
    marginBottom: theme.spacing(2)
  },
  costGroup: {
    backgroundColor: '#fff',
    borderRadius: theme.spacing(1),
    overflow: 'hidden',
    boxShadow: 'none',
    border: '1px solid rgba(0, 0, 0, 0.12)'
  },
  groupHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1.5),
    backgroundColor: '#fff',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.02)'
    }
  },
  groupTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    '& .MuiSvgIcon-root': {
      fontSize: '1.2rem',
      color: '#6B7177'
    }
  },
  groupMetrics: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    color: '#6B7177',
    fontSize: '0.875rem'
  },
  table: {
    '& .MuiTableCell-head': {
      color: '#6B7177',
      fontSize: '0.75rem',
      fontWeight: 500,
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
      padding: '8px 16px'
    },
    '& .MuiTableCell-body': {
      fontSize: '0.875rem',
      padding: '8px 16px'
    }
  },
  actionButton: {
    minWidth: 'unset',
    padding: '4px',
    borderRadius: '4px',
    marginRight: '4px',
    '& .MuiSvgIcon-root': {
      fontSize: '1.2rem'
    }
  },
  statusPill: {
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '0.75rem',
    display: 'inline-block',
    '&.unpaid': {
      backgroundColor: '#FFE9EC',
      color: '#D63649'
    },
    '&.paid': {
      backgroundColor: '#E6F4F1',
      color: '#00847A'
    }
  },
  addLineItem: {
    margin: theme.spacing(3),
    padding: '8px 16px',
    backgroundColor: '#324467 !important',
    color: 'white !important',
    border: 'none !important',
    textTransform: 'none',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: '#2A3A5A !important',
      border: 'none'
    }
  },
  groupDropdown: {
    margin: theme.spacing(2, 0),
    minWidth: 200,
    backgroundColor: '#fff',
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px'
    }
  },
  statusChip: {
    borderRadius: 12,
    padding: '2px 8px',
    fontSize: '0.75rem',
    backgroundColor: '#ffebee',
    color: '#d32f2f'
  },
  dialog: {
    '& .MuiDialog-paper': {
      borderRadius: '12px',
      padding: theme.spacing(2)
    }
  },
  dialogContent: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2)
  },
  newLineItemRow: {
    '& .MuiTableCell-root': {
      padding: '8px 16px',
      borderBottom: 'none'
    },
    '& .MuiTextField-root': {
      margin: 0
    }
  }
}));

const ProfitTracker = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [plannedRevenue, setPlannedRevenue] = useState(0);
  const [costs, setCosts] = useState([{
    id: Date.now(),
    description: 'Roofing Materials',
    category: 'Materials',
    planned: 5000,
    actual: 4500
  }]);
  const [payees, setPayees] = useState([{
    id: 1,
    name: 'Homeowner John Doe',
    contact: 'john@example.com',
    plannedAmount: 15000,
    balance: 0,
    invoice: {
      id: 1,
      jobId: 'ROOF-2023-001',
      description: 'Complete roof replacement',
      scopeOfWork: 'Remove existing roofing materials\nInstall new synthetic underlayment\nInstall architectural shingles',
      amount: 15000,
      dueDate: '2023-08-01',
      paymentRequests: [{
        id: 1,
        type: 'deposit',
        amount: 5000,
        date: '2023-07-15',
        method: 'Check',
        status: 'paid'
      }],
      status: 'partial'
    }
  }]);
  const [openSendDialog, setOpenSendDialog] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [sendMethod, setSendMethod] = useState('email');
  const [contactInfo, setContactInfo] = useState('');
  const [expandedPayments, setExpandedPayments] = useState([]);
  const [costTabValue, setCostTabValue] = useState(0);
  const [costGroups, setCostGroups] = useState([
    {
      type: 'Overhead',
      percentOfRevenue: 8.25,
      actualTotal: 2887.50,
      items: []
    },
    {
      type: 'Materials',
      percentOfRevenue: 21.25,
      actualTotal: 7843.77,
      items: []
    }
  ]);
  const [groupBy, setGroupBy] = useState('');
  const [openNewLineItemDialog, setOpenNewLineItemDialog] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [newLineItem, setNewLineItem] = useState({
    name: '',
    planned: '',
    actual: ''
  });
  const [overheadSections, setOverheadSections] = useState([{
    id: Date.now(),
    name: 'General Overhead',
    items: [],
    isAddingItem: false
  }]);

  const handleAddCost = () => {
    const newCost = {
      id: Date.now(),
      description: 'New Cost Item',
      category: 'Materials',
      planned: 0,
      actual: 0
    };
    setCosts([...costs, newCost]);
  };

  const updateCostField = (id, field, value) => {
    setCosts(prev => prev.map(c => 
      c.id === id ? {...c, [field]: value} : c
    ));
  };

  const deleteCost = (id) => {
    setCosts(prev => prev.filter(c => c.id !== id));
  };

  const handleCreateInvoice = (payeeIndex) => {
    const payee = payees[payeeIndex];
    const invoiceTotal = payee.invoice.paymentRequests.reduce((sum, pmt) => sum + Number(pmt.amount), 0);
    const remainingAllocation = payee.plannedAmount - invoiceTotal;

    if (remainingAllocation <= 0) {
      alert('Cannot create invoice - allocated amount exceeded');
      return;
    }

    const newInvoice = {
      id: Date.now(),
      jobId: 'ROOF-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 1000),
      description: 'Job Invoice',
      scopeOfWork: 'Detailed scope of work...',
      amount: remainingAllocation,
      dueDate: new Date().toISOString().split('T')[0],
      paymentRequests: [],
      status: 'unpaid'
    };
    setPayees(prev => prev.map((p, i) => 
      i === payeeIndex ? {...p, invoice: newInvoice} : p
    ));
  };

  const handleAddPayment = (payeeIndex, invoiceId) => {
    setPayees(prev => prev.map((p, i) => {
      if(i === payeeIndex) {
        return {
          ...p,
          invoice: {
            ...p.invoice,
            paymentRequests: [...p.invoice.paymentRequests, {
              id: Date.now(),
              type: 'progress',
              amount: 0,
              date: new Date().toISOString().split('T')[0],
              method: '',
              status: 'pending'
            }]
          }
        };
      }
      return p;
    }));
  };

  const updateInvoiceField = (payeeIndex, invoiceId, field, value) => {
    setPayees(prev => prev.map((p, i) => {
      if(i === payeeIndex) {
        return {
          ...p,
          invoice: {
            ...p.invoice,
            [field]: value
          }
        };
      }
      return p;
    }));
  };

  const updatePaymentAmount = (payeeIndex, invoiceId, paymentId, value) => {
    setPayees(prev => prev.map((p, i) => {
      if(i === payeeIndex) {
        return {
          ...p,
          invoice: {
            ...p.invoice,
            paymentRequests: p.invoice.paymentRequests.map(pmt => 
              pmt.id === paymentId ? {...pmt, amount: value} : pmt
            )
          }
        };
      }
      return p;
    }));
  };

  const actualRevenue = payees.reduce((sum, payee) => 
    sum + payee.invoice.paymentRequests.reduce((invSum, pmt) => 
      invSum + pmt.amount, 0), 0);

  const handleOpenSendDialog = (invoice, type) => {
    setSelectedInvoice(invoice);
    setSendMethod(type);
    setOpenSendDialog(true);
  };

  const handleSendInvoice = () => {
    // Fake sending logic
    alert(`Invoice ${selectedInvoice.jobId} sent via ${sendMethod} to ${contactInfo}`);
    setOpenSendDialog(false);
  };

  const handleTogglePayments = (invoiceId) => {
    setExpandedPayments(prev => 
      prev.includes(invoiceId) 
        ? prev.filter(id => id !== invoiceId) 
        : [...prev, invoiceId]
    );
  };

  const totalAllocated = payees.reduce((sum, payee) => sum + Number(payee.plannedAmount || 0), 0);
  const allocationRemaining = plannedRevenue - totalAllocated;

  const handleUpdatePayee = (payeeIndex, field, value) => {
    setPayees(prev => prev.map((p, i) => 
      i === payeeIndex ? {...p, [field]: value} : p
    ));
  };

  const handleGroupChange = (event) => {
    setGroupBy(event.target.value);
  };

  const handleOpenNewLineItem = (groupType) => {
    setSelectedGroup(groupType);
    setNewLineItem({ name: '', planned: '', actual: '' });
    setOpenNewLineItemDialog(true);
  };

  const handleStartNewItem = (groupType) => {
    setCostGroups(prev => prev.map(group => ({
      ...group,
      isAddingItem: group.type === groupType
    })));
    setNewLineItem({ name: '', planned: '', actual: '' });
  };

  const handleSaveNewItem = (groupType) => {
    if (!newLineItem.name) return;
    
    setCostGroups(prev => prev.map(group => {
      if (group.type === groupType) {
        return {
          ...group,
          isAddingItem: false,
          items: [...group.items, {
            id: Date.now(),
            name: newLineItem.name,
            planned: Number(newLineItem.planned) || 0,
            actual: Number(newLineItem.actual) || 0,
            status: 'Unpaid'
          }]
        };
      }
      return group;
    }));
  };

  const handleCancelNewItem = (groupType) => {
    setCostGroups(prev => prev.map(group => ({
      ...group,
      isAddingItem: false
    })));
    setNewLineItem({ name: '', planned: '', actual: '' });
  };

  const handleUpdateItem = (groupIndex, itemIndex, field, value) => {
    setCostGroups(prev => prev.map((group, gIndex) => ({
      ...group,
      items: group.items.map((item, i) =>
        i === itemIndex ? {...item, [field]: value} : item
      )
    })));
  };

  const handleRemoveItem = (groupIndex, itemIndex) => {
    setCostGroups(prev => prev.map((group, gIndex) => ({
      ...group,
      items: group.items.filter((_, i) => i !== itemIndex)
    })));
  };

  const handleUpdateSectionName = (groupIndex, newName) => {
    setCostGroups(prev => prev.map((group, gIndex) => ({
      ...group,
      name: newName
    })));
  };

  const calculateOverheadTotals = (items) => {
    const totalAmount = items.reduce((sum, item) => sum + (Number(item.planned) || 0), 0);
    const totalPercentage = (totalAmount / plannedRevenue) * 100;
    return { totalAmount, totalPercentage };
  };

  return (
    <Paper className={classes.container}>
      <Typography variant="h4" gutterBottom>
        Profit Tracker
      </Typography>
      
      <Tabs value={tabValue} onChange={(e, newVal) => setTabValue(newVal)}>
        <Tab label="Cost Management" />
        <Tab label="Revenue Management" />
      </Tabs>

      {tabValue === 0 && (
        <div className={classes.section}>
          <div className={classes.metricsContainer}>
            <Paper className={classes.metricCard}>
              <Box className={classes.metricValue}>
                <Typography variant="h5">41.14%</Typography>
                <ArrowUpwardIcon className="trend-up" sx={{ fontSize: 16 }} />
                <IconButton size="small">
                  <InfoIcon fontSize="small" sx={{ color: '#6B7177' }} />
                </IconButton>
              </Box>
              <Typography variant="body2" sx={{ color: '#6B7177' }}>
                Actual Profit Margin
              </Typography>
            </Paper>
            
            <Paper className={classes.metricCard}>
              <Box className={classes.metricValue}>
                <Typography variant="h5">${costs.reduce((sum, c) => sum + Number(c.planned), 0)}</Typography>
                <IconButton size="small">
                  <InfoIcon fontSize="small" />
                </IconButton>
              </Box>
              <Typography variant="body2" color="textSecondary">
                Planned Cost
              </Typography>
            </Paper>
            
            {/* Add similar cards for Actual Revenue and Actual Cost */}
          </div>

          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={costTabValue} onChange={(e, val) => setCostTabValue(val)}>
              <Tab label="Cost" />
              <Tab label="Commissions" />
            </Tabs>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <FormControl className={classes.groupDropdown}>
              <Select
                value={groupBy}
                onChange={handleGroupChange}
                displayEmpty
                variant="outlined"
                size="small"
              >
                <MenuItem value="">Group Items by Cost Type</MenuItem>
                <MenuItem value="category">Category</MenuItem>
                <MenuItem value="status">Status</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button 
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => setOverheadSections([...overheadSections, {
                id: Date.now(),
                name: 'New Section',
                items: [],
                isAddingItem: false
              }])}
            >
              Add Overhead Section
            </Button>
          </Box>

          {costGroups.map((group, gIndex) => (
            <div key={group.type} className={classes.costSection}>
              <Accordion 
                className={classes.costGroup}
                defaultExpanded
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  className={classes.groupHeader}
                >
                  <div className={classes.groupTitle}>
                    <Typography variant="subtitle1">{group.type}</Typography>
                  </div>
                  <div className={classes.groupMetrics}>
                    {group.type === 'Overhead' ? (
                      <>
                        <span>{calculateOverheadTotals(group.items).totalPercentage.toFixed(2)}% of Revenue</span>
                        <span>${calculateOverheadTotals(group.items).totalAmount.toFixed(2)}</span>
                      </>
                    ) : (
                      <>
                        <span>Planned: ${group.items.reduce((sum, item) => sum + (Number(item.planned) || 0), 0).toFixed(2)}</span>
                        <span>Actual: ${group.items.reduce((sum, item) => sum + (Number(item.actual) || 0), 0).toFixed(2)}</span>
                      </>
                    )}
                  </div>
                </AccordionSummary>
                
                <AccordionDetails sx={{ padding: 0 }}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Line Item</TableCell>
                        {group.type === 'Overhead' ? (
                          <>
                            <TableCell align="right">% of Revenue</TableCell>
                            <TableCell align="right">$ Amount</TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell align="right">Planned Cost</TableCell>
                            <TableCell align="right">Actual Cost</TableCell>
                            <TableCell align="right">Variance</TableCell>
                            <TableCell>Status</TableCell>
                          </>
                        )}
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {group.items.map((item, i) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <TextField
                              value={item.name}
                              onChange={(e) => handleUpdateItem(gIndex, i, 'name', e.target.value)}
                              fullWidth
                            />
                          </TableCell>
                          {group.type === 'Overhead' ? (
                            <>
                              <TableCell align="right">
                                <TextField
                                  type="number"
                                  value={item.percentage || ''}
                                  onChange={(e) => {
                                    const percentage = parseFloat(e.target.value);
                                    const amount = (percentage / 100) * plannedRevenue;
                                    handleUpdateItem(gIndex, i, 'percentage', percentage);
                                    handleUpdateItem(gIndex, i, 'planned', amount);
                                  }}
                                  InputProps={{
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                  }}
                                />
                              </TableCell>
                              <TableCell align="right">
                                <TextField
                                  type="number"
                                  value={item.planned || ''}
                                  onChange={(e) => {
                                    const amount = parseFloat(e.target.value);
                                    const percentage = (amount / plannedRevenue) * 100;
                                    handleUpdateItem(gIndex, i, 'planned', amount);
                                    handleUpdateItem(gIndex, i, 'percentage', percentage);
                                  }}
                                  InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                  }}
                                />
                              </TableCell>
                            </>
                          ) : (
                            <>
                              <TableCell align="right">
                                <TextField
                                  type="number"
                                  value={item.planned}
                                  onChange={(e) => handleUpdateItem(gIndex, i, 'planned', e.target.value)}
                                  InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                  }}
                                />
                              </TableCell>
                              <TableCell align="right">
                                <TextField
                                  type="number"
                                  value={item.actual}
                                  onChange={(e) => handleUpdateItem(gIndex, i, 'actual', e.target.value)}
                                  InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                  }}
                                />
                              </TableCell>
                              <TableCell align="right">
                                ${(item.planned - item.actual).toFixed(2)}
                              </TableCell>
                              <TableCell>
                                <span className={`${classes.statusPill} ${item.paid ? 'paid' : 'unpaid'}`}>
                                  {item.paid ? 'Paid' : 'Unpaid'}
                                </span>
                              </TableCell>
                            </>
                          )}
                          <TableCell>
                            <IconButton onClick={() => handleRemoveItem(gIndex, i)}>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                      {group.isAddingItem && (
                        <TableRow className={classes.newLineItemRow}>
                          <TableCell>
                            <TextField
                              size="small"
                              placeholder="Enter name"
                              value={newLineItem.name}
                              onChange={(e) => setNewLineItem(prev => ({ ...prev, name: e.target.value }))}
                              fullWidth
                            />
                          </TableCell>
                          <TableCell align="right">
                            <TextField
                              size="small"
                              type="number"
                              placeholder="0.00"
                              value={newLineItem.planned}
                              onChange={(e) => setNewLineItem(prev => ({ ...prev, planned: e.target.value }))}
                              InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>
                              }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <TextField
                              size="small"
                              type="number"
                              placeholder="0.00"
                              value={newLineItem.actual}
                              onChange={(e) => setNewLineItem(prev => ({ ...prev, actual: e.target.value }))}
                              InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>
                              }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            ${((Number(newLineItem.planned) || 0) - (Number(newLineItem.actual) || 0)).toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <span className={`${classes.statusPill} unpaid`}>
                              Unpaid
                            </span>
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              size="small"
                              onClick={() => handleSaveNewItem(group.type)}
                              sx={{ mr: 1 }}
                            >
                              Save
                            </Button>
                            <Button
                              size="small"
                              onClick={() => handleCancelNewItem(group.type)}
                            >
                              Cancel
                            </Button>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                  <Box sx={{ padding: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      className={classes.addLineItem}
                      onClick={() => handleStartNewItem(group.type)}
                      disabled={group.isAddingItem}
                    >
                      Add Line Item
                    </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
        </div>
      )}

      {tabValue === 1 && (
        <div className={classes.section}>
          <div className={classes.metricsContainer}>
            <Paper className={classes.metricCard}>
              <Box className={classes.metricValue}>
                <Typography variant="h5">${plannedRevenue}</Typography>
                <IconButton size="small">
                  <InfoIcon fontSize="small" sx={{ color: '#6B7177' }} />
                </IconButton>
              </Box>
              <Typography variant="body2" sx={{ color: '#6B7177' }}>
                Total Planned Revenue
              </Typography>
            </Paper>
            
            <Paper className={classes.metricCard}>
              <Box className={classes.metricValue}>
                <Typography variant="h5">${actualRevenue}</Typography>
                <IconButton size="small">
                  <InfoIcon fontSize="small" />
                </IconButton>
              </Box>
              <Typography variant="body2" color="textSecondary">
                Actual Revenue
              </Typography>
            </Paper>
            
            <Paper className={classes.metricCard}>
              <Box className={classes.metricValue}>
                <Typography variant="h5">${totalAllocated}</Typography>
                <IconButton size="small">
                  <InfoIcon fontSize="small" />
                </IconButton>
              </Box>
              <Typography variant="body2" color="textSecondary">
                Allocated Revenue
              </Typography>
            </Paper>
          </div>

          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Job Value Allocation (Planned: ${plannedRevenue})
              <Typography variant="body2" color="textSecondary">
                Allocated: ${totalAllocated} • Remaining: ${allocationRemaining}
              </Typography>
            </Typography>
          </Box>

          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            className={classes.addLineItem}
            onClick={() => setPayees([...payees, {
              id: Date.now(),
              name: 'New Payee',
              contact: '',
              plannedAmount: allocationRemaining > 0 ? Math.min(allocationRemaining, 0) : 0,
              balance: 0,
              invoice: {
                id: Date.now(),
                jobId: 'ROOF-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 1000),
                description: 'Job Invoice',
                scopeOfWork: '',
                amount: allocationRemaining > 0 ? Math.min(allocationRemaining, 0) : 0,
                dueDate: new Date().toISOString().split('T')[0],
                paymentRequests: [],
                status: 'unpaid'
              }
            }])}
          >
            Add Payee
          </Button>

          {payees.map((payee, pIndex) => (
            <Accordion 
              key={payee.id} 
              className={classes.costGroup}
              defaultExpanded
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                className={classes.groupHeader}
              >
                <div className={classes.groupTitle}>
                  <Typography variant="subtitle1">{payee.name}</Typography>
                </div>
                <div className={classes.groupMetrics}>
                  <span>Allocated: ${payee.plannedAmount}</span>
                  <span>Balance: ${payee.balance}</span>
                </div>
              </AccordionSummary>

              <AccordionDetails sx={{ padding: 0 }}>
                <Box p={2}>
                  <TextField
                    label="Allocated Amount"
                    type="number"
                    value={payee.plannedAmount}
                    onChange={(e) => handleUpdatePayee(pIndex, 'plannedAmount', e.target.value)}
                    InputProps={{ 
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      sx: { maxWidth: 200 } 
                    }}
                    fullWidth
                    margin="normal"
                  />

                  {payee.invoice ? (
                    <Paper className={classes.invoiceSection}>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <div>
                          <Typography variant="subtitle1">INVOICE #: {payee.invoice.jobId}</Typography>
                          <Typography variant="body2">Status: {payee.invoice.status}</Typography>
                        </div>
                        <Box>
                          <Button 
                            variant="outlined" 
                            className={classes.actionButton}
                            onClick={() => handleOpenSendDialog(payee.invoice, 'invoice')}
                          >
                            <ReceiptIcon /> Email
                          </Button>
                          <Button 
                            variant="outlined" 
                            className={classes.actionButton}
                            onClick={() => handleOpenSendDialog(payee.invoice, 'payment')}
                          >
                            <LinkIcon /> Request
                          </Button>
                        </Box>
                      </Box>
                      
                      <Typography variant="subtitle2" gutterBottom>Scope of Work:</Typography>
                      <Typography variant="body2" whiteSpace="pre-wrap" paragraph>
                        {payee.invoice.scopeOfWork}
                      </Typography>

                      <Table className={classes.table}>
                        <TableHead>
                          <TableRow>
                            <TableCell>Payment Type</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {payee.invoice.paymentRequests.map(payment => (
                            <TableRow key={payment.id}>
                              <TableCell>{payment.type}</TableCell>
                              <TableCell align="right">${payment.amount}</TableCell>
                              <TableCell>{payment.date}</TableCell>
                              <TableCell>
                                <span className={`${classes.statusPill} ${payment.status}`}>
                                  {payment.status}
                                </span>
                              </TableCell>
                              <TableCell align="right">
                                <IconButton size="small" className={classes.actionButton}>
                                  <MoreVertIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Paper>
                  ) : (
                    <Button 
                      variant="contained" 
                      className={classes.addLineItem}
                      onClick={() => handleCreateInvoice(pIndex)}
                    >
                      Create Job Invoice
                    </Button>
                  )}
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      )}
    </Paper>
  );
};

export default ProfitTracker; 