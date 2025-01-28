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
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { theme } from '../theme';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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
    alignItems: 'center',
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
    flex: '0 0 auto',
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
    fontSize: '0.875rem',
    flex: '1 1 auto',
    justifyContent: 'flex-end',
    paddingLeft: theme.spacing(2),
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
  },
  dragHandle: {
    cursor: 'grab',
    '&:active': { cursor: 'grabbing' }
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
      name: 'Overhead',
      percentOfRevenue: 8.25,
      actualTotal: 2887.50,
      items: []
    },
    {
      type: 'Materials',
      name: 'Materials',
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
  const [openPlannedRevenueDialog, setOpenPlannedRevenueDialog] = useState(false);
  const [plannedRevenueInput, setPlannedRevenueInput] = useState(plannedRevenue.toString());

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
    
    const newItem = {
      id: Date.now(),
      name: newLineItem.name,
      status: 'Unpaid'
    };

    if (groupType === 'Overhead') {
      newItem.percentage = newLineItem.percentage || '0.00';
      newItem.planned = ((Number(newLineItem.percentage || 0) / 100) * plannedRevenue).toFixed(2);
    } else {
      newItem.planned = Number(newLineItem.planned) || 0;
      newItem.actual = Number(newLineItem.actual) || 0;
    }

    setCostGroups(prev => prev.map(group => {
      if (group.type === groupType) {
        return {
          ...group,
          isAddingItem: false,
          items: [...group.items, newItem]
        };
      }
      return group;
    }));

    setNewLineItem({ name: '', planned: '', actual: '' });
  };

  const handleCancelNewItem = (groupType) => {
    setCostGroups(prev => prev.map(group => ({
      ...group,
      isAddingItem: false
    })));
    setNewLineItem({ name: '', planned: '', actual: '' });
  };

  const handleUpdateItem = (groupIndex, itemIndex, field, value) => {
    setCostGroups(prev => prev.map((group, gIndex) => {
      if (gIndex !== groupIndex) return group;
      
      const updatedItems = group.items.map((item, i) => {
        if (i !== itemIndex) return item;
        
        const updatedItem = { ...item };
        
        if (group.type === 'Overhead') {
          if (field === 'percentage') {
            // Store percentage as is (string with decimals)
            const percentage = parseFloat(value) || 0;
            updatedItem.percentage = value;
            // Calculate dollar amount based on percentage
            const amount = (percentage / 100) * plannedRevenue;
            updatedItem.planned = amount.toFixed(2);
          } else {
            updatedItem[field] = value;
          }
        } else {
          updatedItem[field] = value;
        }
        
        return updatedItem;
      });

      return {
        ...group,
        items: updatedItems
      };
    }));
  };

  const handleRemoveItem = (groupIndex, itemIndex) => {
    setCostGroups(prev => prev.map((group, gIndex) => ({
      ...group,
      items: group.items.filter((_, i) => i !== itemIndex)
    })));
  };

  const handleDragEnd = (result) => {
    if (!result.destination || result.source.index === result.destination.index) return;
    
    const items = Array.from(costGroups);
    const [reorderedItem] = items.splice(result.source.index, 1);
    
    // Prevent moving Overhead section
    if (reorderedItem.type === 'Overhead') return;
    
    items.splice(result.destination.index, 0, reorderedItem);
    setCostGroups(items);
  };

  const handleUpdateSectionName = (groupIndex, newName) => {
    if (costGroups[groupIndex].type === 'Overhead') return;
    setCostGroups(prev => prev.map((group, gIndex) => 
      gIndex === groupIndex ? {...group, name: newName} : group
    ));
  };

  const calculateOverheadTotals = (items) => {
    const totalAmount = items.reduce((sum, item) => sum + (Number(item.planned) || 0), 0);
    const totalPercentage = items.reduce((sum, item) => sum + (Number(item.percentage) || 0), 0);
    return { 
      totalAmount: totalAmount.toFixed(2), 
      totalPercentage: totalPercentage.toFixed(2)
    };
  };

  const handlePlannedRevenueUpdate = () => {
    const newValue = Number(plannedRevenueInput) || 0;
    setPlannedRevenue(newValue);
    setOpenPlannedRevenueDialog(false);
  };

  const handleAddLineItem = (groupIndex) => {
    setCostGroups(prev => prev.map((group, gIndex) => 
      gIndex === groupIndex ? {...group, isAddingItem: true} : group
    ));
    setNewLineItem({
      name: '',
      planned: '',
      actual: '',
      percentage: ''
    });
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
                <Typography variant="h5" sx={{ color: '#00847A' }}>41.14%</Typography>
                <ArrowUpwardIcon className="trend-up" sx={{ fontSize: 16, color: '#00847A' }} />
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
                <Typography variant="h5" sx={{ color: '#000' }}>${plannedRevenue.toFixed(2)}</Typography>
                <IconButton 
                  size="small" 
                  onClick={() => setOpenPlannedRevenueDialog(true)}
                >
                  <AddIcon fontSize="small" sx={{ color: '#6B7177' }} />
                </IconButton>
              </Box>
              <Typography variant="body2" sx={{ color: '#6B7177' }}>
                Planned Revenue
              </Typography>
            </Paper>

            <Paper className={classes.metricCard}>
              <Box className={classes.metricValue}>
                <Typography variant="h5" sx={{ color: '#000' }}>$19,500.00</Typography>
                <IconButton size="small">
                  <AddIcon fontSize="small" sx={{ color: '#6B7177' }} />
                </IconButton>
              </Box>
              <Typography variant="body2" sx={{ color: '#6B7177' }}>
                Planned Cost
              </Typography>
            </Paper>

            <Paper className={classes.metricCard}>
              <Box className={classes.metricValue}>
                <Typography variant="h5" sx={{ color: '#00847A' }}>$35,000.00</Typography>
                <ArrowUpwardIcon className="trend-up" sx={{ fontSize: 16, color: '#00847A' }} />
                <IconButton size="small">
                  <InfoIcon fontSize="small" sx={{ color: '#6B7177' }} />
                </IconButton>
              </Box>
              <Typography variant="body2" sx={{ color: '#6B7177' }}>
                Actual Revenue
              </Typography>
            </Paper>

            <Paper className={classes.metricCard}>
              <Box className={classes.metricValue}>
                <Typography variant="h5" sx={{ color: '#D63649' }}>$20,600.00</Typography>
                <IconButton size="small">
                  <AddIcon fontSize="small" sx={{ color: '#6B7177' }} />
                </IconButton>
              </Box>
              <Typography variant="body2" sx={{ color: '#6B7177' }}>
                Actual Cost
              </Typography>
            </Paper>
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

          {costGroups.map((group, gIndex) => (
            <div className={classes.costSection} key={group.type}>
              <Accordion 
                className={classes.costGroup}
                defaultExpanded
                draggable={group.type !== 'Overhead'}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  className={classes.groupHeader}
                >
                  {group.type !== 'Overhead' && (
                    <IconButton 
                      className={classes.dragHandle}
                      onMouseDown={(e) => e.stopPropagation()}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <DragIndicatorIcon />
                    </IconButton>
                  )}
                  
                  <div className={classes.groupTitle}>
                    {group.type === 'Overhead' ? (
                      <Typography variant="subtitle1">{group.name}</Typography>
                    ) : (
                      <TextField
                        value={group.name}
                        onChange={(e) => handleUpdateSectionName(gIndex, e.target.value)}
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                      />
                    )}
                  </div>

                  <div className={classes.groupMetrics}>
                    {group.type === 'Overhead' ? (
                      <>
                        <Typography variant="body2" sx={{ color: '#424242', fontWeight: 500, mr: 3 }}>
                          Total: {calculateOverheadTotals(group.items).totalPercentage}%
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#424242', fontWeight: 500 }}>
                          Total: ${calculateOverheadTotals(group.items).totalAmount}
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Typography variant="body2" sx={{ color: '#424242', fontWeight: 500, mr: 3 }}>
                          Planned: ${group.items.reduce((sum, item) => sum + Number(item.planned || 0), 0).toFixed(2)}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#424242', fontWeight: 500 }}>
                          Actual: ${group.items.reduce((sum, item) => sum + Number(item.actual || 0), 0).toFixed(2)}
                        </Typography>
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
                                  onChange={(e) => handleUpdateItem(gIndex, i, 'percentage', e.target.value)}
                                  InputProps={{
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                    inputProps: { 
                                      step: "0.01",
                                      min: "0",
                                      max: "100"
                                    }
                                  }}
                                  sx={{ width: '120px' }}
                                />
                              </TableCell>
                              <TableCell align="right">
                                <Typography>
                                  ${((Number(item.percentage || 0) / 100) * plannedRevenue).toFixed(2)}
                                </Typography>
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
                          
                          {group.type === 'Overhead' ? (
                            <>
                              <TableCell align="right">
                                <TextField
                                  size="small"
                                  type="number"
                                  placeholder="0.00"
                                  value={newLineItem.percentage || ''}
                                  onChange={(e) => setNewLineItem(prev => ({ ...prev, percentage: e.target.value }))}
                                  InputProps={{
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                    inputProps: { 
                                      step: "0.01",
                                      min: "0",
                                      max: "100"
                                    }
                                  }}
                                />
                              </TableCell>
                              <TableCell align="right">
                                <Typography>
                                  ${((Number(newLineItem.percentage || 0) / 100) * plannedRevenue).toFixed(2)}
                                </Typography>
                              </TableCell>
                            </>
                          ) : (
                            <>
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
                            </>
                          )}
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

                  {/* Add Line Item Button */}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-start', p: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => handleStartNewItem(group.type)}
                      sx={{ 
                        backgroundColor: '#324467', 
                        color: 'white',
                        '&:hover': { backgroundColor: '#2A3A5A' }
                      }}
                    >
                      Add Line Item
                    </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button 
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => setCostGroups([...costGroups, {
                type: 'Cost',
                name: 'New Section',
                items: [],
                percentOfRevenue: 0,
                actualTotal: 0
              }])}
            >
              Add Section
            </Button>
          </Box>
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

      <Dialog 
        open={openPlannedRevenueDialog} 
        onClose={() => setOpenPlannedRevenueDialog(false)}
        className={classes.dialog}
      >
        <DialogTitle>Update Planned Revenue</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField
            label="Planned Revenue"
            type="number"
            value={plannedRevenueInput}
            onChange={(e) => setPlannedRevenueInput(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPlannedRevenueDialog(false)}>Cancel</Button>
          <Button 
            onClick={handlePlannedRevenueUpdate}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ProfitTracker; 