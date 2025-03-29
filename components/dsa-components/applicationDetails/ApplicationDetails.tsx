import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  MessageSquare,
  Paperclip,
  User,
  ChevronDown,
  Send,
  Clock,
  IndianRupee,
  Building2,
  FileCheck,
  BadgeIndianRupee,
  X,
  ClipboardCheck,
  Search,
  FileWarning,
  CheckCircle2,
  XCircle,
  Banknote,
} from 'lucide-react';
import Header from '../common/Header';
import { useDispatch } from 'react-redux';
import { setHeaderText } from '../../../store/slices/commonSlice';
import { motion, AnimatePresence } from 'framer-motion';

// Types
type Comment = {
  id: number;
  author: string;
  isBank: boolean;
  content: string;
  timestamp: string;
};

type Attachment = {
  id: number;
  name: string;
  size: string;
  type: string;
};

type TimelineEvent = {
  id: number;
  type: 'status_change' | 'comment' | 'document_added';
  content: string;
  timestamp: string;
  oldStatus?: string;
  newStatus?: string;
};

type LoanStatus = 'SUBMITTED' | 'UNDER_REVIEW' | 'CHANGES_REQUIRED' | 'APPROVED' | 'REJECTED' | 'DISBURSED';
type LoanType = 'PERSONAL' | 'HOME' | 'BUSINESS' | 'VEHICLE';

type StatusTransition = {
  from: LoanStatus;
  to: LoanStatus[];
};

// Add this type for status colors
type StatusColor = {
  background: string;
  text: string;
  icon: string;
};

// Add this status color mapping
const statusColors: Record<LoanStatus, StatusColor> = {
  SUBMITTED: {
    background: '#F4F5F7',
    text: '#42526E',
    icon: '#6B778C'
  },
  UNDER_REVIEW: {
    background: '#FFF7D6',
    text: '#172B4D',
    icon: '#FF991F'
  },
  CHANGES_REQUIRED: {
    background: '#FFF7D6',
    text: '#172B4D',
    icon: '#FF991F'
  },
  APPROVED: {
    background: '#E3FCEF',
    text: '#006644',
    icon: '#36B37E'
  },
  REJECTED: {
    background: '#FFEBE6',
    text: '#BF2600',
    icon: '#FF5630'
  },
  DISBURSED: {
    background: '#E3FCEF',
    text: '#006644',
    icon: '#36B37E'
  }
};

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(9, 30, 66, 0.54);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  overflow-y: auto;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 3px;
  box-shadow: 0 8px 16px -4px rgba(9, 30, 66, 0.25), 
              0 0 0 1px rgba(9, 30, 66, 0.08);
  width: 100%;
  max-width: 600px;
  position: relative;
  margin: auto;
`;

const ModalHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #DFE1E6;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 500;
  color: #172B4D;
  line-height: 24px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #6B778C;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: #EBECF0;
    color: #172B4D;
  }
`;

const ModalBody = styled.div`
  padding: 20px 24px;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
`;

const StatusOptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StatusOption = styled.button<{ variant: string; isSelected: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  border-radius: 3px;
  border: 2px solid ${props => props.isSelected ? '#4C9AFF' : 'transparent'};
  background-color: ${props => props.isSelected ? 
    statusColors[props.variant as LoanStatus].background : 'transparent'};
  cursor: pointer;
  width: 100%;
  text-align: left;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.isSelected ? 
      statusColors[props.variant as LoanStatus].background : '#F4F5F7'};
  }

  svg {
    margin-top: 2px;
    flex-shrink: 0;
    color: ${props => statusColors[props.variant as LoanStatus].icon};
  }
`;

const StatusInfo = styled.div`
  flex-grow: 1;
`;

const StatusName = styled.div<{ variant: string }>`
  font-size: 14px;
  font-weight: 500;
  color: ${props => statusColors[props.variant as LoanStatus].text};
  margin-bottom: 4px;
  line-height: 20px;
`;

const StatusDescription = styled.div`
  font-size: 12px;
  color: #6B778C;
  line-height: 16px;
`;

const ModalFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid #DFE1E6;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const Button = styled.button<{ variant?: 'primary' }>`
  padding: 8px 12px;
  border-radius: 3px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => props.variant === 'primary' ? `
    background-color: #0052CC;
    color: white;
    border: none;

    &:hover {
      background-color: #0065FF;
    }

    &:active {
      background-color: #0747A6;
    }
  ` : `
    background-color: transparent;
    color: #42526E;
    border: none;

    &:hover {
      background-color: #F4F5F7;
    }

    &:active {
      background-color: #EBECF0;
    }
  `}
`;

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #F4F5F7;
  padding-top: 5rem;
  background: white;
`;

const ContentWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const MainContent = styled.div`
  flex-grow: 1;
`;

const Card = styled.div`
  background: #F7FAFC;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(9, 30, 66, 0.13);
  padding: 1.5rem;
  margin-bottom: 1.5rem;

`;

const AppHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const TicketId = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #7A869A;
  font-size: 0.875rem;
`;

const StatusContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Badge = styled.span<{ variant: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  ${props => {
    if (statusColors[props.variant as LoanStatus]) {
      const colors = statusColors[props.variant as LoanStatus];
      return `
        background-color: ${colors.background};
        color: ${colors.text};
      `;
    }
    return 'background-color: #EBECF0; color: #172B4D;';
  }}
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #172B4D;
  margin: 0 0 1rem 0;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #7A869A;
  font-size: 0.875rem;
  padding: 0.5rem;
  background: #FAFBFC;
  border-radius: 0.375rem;
`;

const DocumentsSection = styled.div`
  border-top: 1px solid #DFE1E6;
  padding-top: 1rem;
  margin-top: 1rem;
`;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #0747A6;
  font-size: 1.125rem;
  font-weight: 500;
  margin: 0 0 1rem 0;
`;

const DocumentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 0.75rem;
`;

const DocumentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background-color: #FAFBFC;
  border-radius: 0.375rem;
  border: 1px solid #DFE1E6;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #DEEBFF;
    border-color: #4C9AFF;
  }
`;

const DocumentInfo = styled.div`
  flex-grow: 1;
`;

const DocumentName = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: #0747A6;
  margin: 0;
`;

const DocumentMeta = styled.p`
  font-size: 0.75rem;
  color: #7A869A;
  margin: 0.25rem 0 0 0;
`;

const Timeline = styled.div`
  position: relative;
  padding-left: 2rem;

  &::before {
    content: '';
    position: absolute;
    left: 7px;
    top: 0.625rem;
    bottom: 4.625rem;
    width: 2px;
    background-color: #DFE1E6;
  }
`;

const TimelineItem = styled.div`
  position: relative;
  padding-bottom: 1.5rem;

  &:last-child {
    padding-bottom: 0;

    &::before {
      display: none;
    }
  }
`;

const TimelineDot = styled.div`
  position: absolute;
  left: -2rem;
  top: 0.25rem;
  width: 1rem;
  height: 1rem;
  background-color: #4C9AFF;
  border: 2px solid #FFFFFF;
  border-radius: 50%;
  z-index: 1;
`;

const TimelineContent = styled.div`
  background-color: #FAFBFC;
  border: 1px solid #DFE1E6;
  border-radius: 0.375rem;
  padding: 0.75rem;
`;

const TimelineText = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: #0747A6;
  margin: 0;
`;

const TimelineTime = styled.p`
  font-size: 0.75rem;
  color: #7A869A;
  margin: 0.25rem 0 0 0;
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const CommentItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: #FAFBFC;
  border-radius: 0.375rem;
  border: 1px solid #DFE1E6;
`;

const Avatar = styled.div<{ isBank: boolean }>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.isBank ? '#DEEBFF' : '#EBECF0'};
  border: 2px solid ${props => props.isBank ? '#4C9AFF' : '#DFE1E6'};
  flex-shrink: 0;
`;

const CommentContent = styled.div`
  flex-grow: 1;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
`;

const CommentAuthor = styled.span`
  font-weight: 500;
  color: #0747A6;
`;

const CommentRole = styled.span<{ isBank: boolean }>`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  background-color: ${props => props.isBank ? '#DEEBFF' : '#EBECF0'};
  color: #0747A6;
`;

const CommentTime = styled.span`
  font-size: 0.75rem;
  color: #7A869A;
`;

const CommentText = styled.p`
  color: #172B4D;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
`;

const CommentForm = styled.form`
  position: relative;
  margin-top: 1rem;
`;

const CommentInput = styled.textarea`
  width: 100%;
  border: 2px solid #DFE1E6;
  border-radius: 0.375rem;
  padding: 0.75rem 3rem 0.75rem 1rem;
  resize: vertical;
  min-height: 6rem;
  font-size: 0.875rem;
  line-height: 1.5;
  color: #172B4D;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #4C9AFF;
    box-shadow: 0 0 0 2px rgba(76, 154, 255, 0.2);
  }

  &::placeholder {
    color: #7A869A;
  }
`;

const SendButton = styled.button`
  position: absolute;
  right: 0.75rem;
  bottom: 0.75rem;
  padding: 0.5rem;
  color: #0052CC;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  border: none;
  background: none;
  cursor: pointer;

  &:hover {
    background-color: #DEEBFF;
    color: #0747A6;
  }

  &:active {
    background-color: #B3D4FF;
  }
`;

const Sidebar = styled.div`
  width: 20rem;
  flex-shrink: 0;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #0747A6;
  margin-bottom: 0.5rem;
`;

const Select = styled.select`
  width: 100%;
  background-color: white;
  border: 2px solid #DFE1E6;
  border-radius: 0.375rem;
  padding: 0.5rem 2rem 0.5rem 1rem;
  appearance: none;
  color: #172B4D;
  font-size: 0.875rem;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #4C9AFF;
    box-shadow: 0 0 0 2px rgba(76, 154, 255, 0.2);
  }

  &:hover {
    background-color: #FAFBFC;
  }
`;

const SelectWrapper = styled.div`
  position: relative;

  svg {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: #7A869A;
  }
`;

const StatusButton = styled.button`
  width: 100%;
  background-color: white;
  border: 2px solid #DFE1E6;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  color: #172B4D;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #FAFBFC;
    border-color: #4C9AFF;
  }
`;

const StatusDropdown = styled.div`
  position: relative;
  width: 100%;
`;

const StatusTransitionButton = styled.button<{ status: string }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 2px solid #DFE1E6;
  border-radius: 3px;
  background-color: ${props => statusColors[props.status as LoanStatus].background};
  color: ${props => statusColors[props.status as LoanStatus].text};
  font-size: 14px;
  width: 100%;
  cursor: pointer;
  transition: all 0.2s ease;
  justify-content: space-between;

  &:hover {
    filter: brightness(0.98);
  }

  .status-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .status-icon {
    color: ${props => statusColors[props.status as LoanStatus].icon};
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: white;
  border-radius: 3px;
  box-shadow: 0 4px 8px rgba(9, 30, 66, 0.25);
  border: 1px solid #DFE1E6;
  z-index: 10;
  overflow: hidden;
  padding: 4px;
`;

const DropdownItem = styled.button<{ status: string }>`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px;
  border: none;
  text-align: left;
  background: white;
  color: ${props => statusColors[props.status as LoanStatus].text};
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 2px;
  font-size: 14px;

  &:hover {
    filter: brightness(0.95);
  }

  svg {
    color: ${props => statusColors[props.status as LoanStatus].icon};
  }
`;

const ModalSection = styled.div`
  &:not(:first-child) {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #DFE1E6;
  }
`;

const ModalLabel = styled.label`
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: #6B778C;
  margin-bottom: 4px;
`;

const AssigneeSelect = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 2px solid #DFE1E6;
  border-radius: 3px;
  background-color: white;
  color: #172B4D;
  font-size: 14px;
  line-height: 20px;
  transition: all 0.2s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%236B778C' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  padding-right: 32px;

  &:hover {
    background-color: #FAFBFC;
  }

  &:focus {
    border-color: #4C9AFF;
    outline: none;
    box-shadow: 0 0 0 2px rgba(76, 154, 255, 0.2);
  }
`;

const CommentTextarea = styled.textarea`
  width: 100%;
  padding: 8px 12px;
  border: 2px solid #DFE1E6;
  border-radius: 3px;
  background-color: white;
  color: #172B4D;
  font-size: 14px;
  min-height: 80px;
  resize: vertical;
  transition: border-color 0.2s ease;

  &:hover {
    background-color: #FAFBFC;
  }

  &:focus {
    border-color: #4C9AFF;
    outline: none;
  }

  &::placeholder {
    color: #7A869A;
  }
`;

function ApplicationDetails() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Rahul DSA",
      isBank: false,
      content: "I've submitted the loan application for Mr. Patel. All required documents including income proof, bank statements, and KYC are attached. The client has a good credit score of 750.",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      author: "Priya Sharma",
      isBank: true,
      content: "Thank you for the submission. I notice the bank statements are only for 3 months. As per our policy, we need statements for the last 6 months. Please provide the additional statements.",
      timestamp: "1 hour ago"
    }
  ]);

  const [timeline, setTimeline] = useState<TimelineEvent[]>([
    {
      id: 1,
      type: 'status_change',
      content: 'Loan application submitted',
      timestamp: '2 hours ago',
      oldStatus: '',
      newStatus: 'SUBMITTED'
    },
    {
      id: 2,
      type: 'document_added',
      content: 'Documents uploaded: Income Proof, Bank Statements, KYC',
      timestamp: '2 hours ago'
    },
    {
      id: 3,
      type: 'status_change',
      content: 'Application under review',
      timestamp: '1.5 hours ago',
      oldStatus: 'SUBMITTED',
      newStatus: 'UNDER_REVIEW'
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [assignee, setAssignee] = useState('Priya Sharma');
  const [status, setStatus] = useState<LoanStatus>('SUBMITTED');
  const [loanType, setLoanType] = useState<LoanType>('PERSONAL');
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<LoanStatus | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [transitionComment, setTransitionComment] = useState('');
  const [transitionAssignee, setTransitionAssignee] = useState('');

  const attachments: Attachment[] = [
    { id: 1, name: 'income-proof-2024.pdf', size: '2.1 MB', type: 'Document' },
    { id: 2, name: 'bank-statements.pdf', size: '3.4 MB', type: 'Document' },
    { id: 3, name: 'kyc-documents.pdf', size: '1.8 MB', type: 'Document' },
    { id: 4, name: 'credit-report.pdf', size: '956 KB', type: 'Document' }
  ];


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeaderText('Application Details'));
  }, [dispatch]);

  const statuses: { 
    status: LoanStatus; 
    description: string;
    icon: React.ReactNode;
  }[] = [
    { 
      status: 'SUBMITTED', 
      description: 'Application has been submitted and is pending review',
      icon: <ClipboardCheck size={20} />
    },
    { 
      status: 'UNDER_REVIEW', 
      description: 'Application is being reviewed by the bank team',
      icon: <Search size={20} />
    },
    { 
      status: 'APPROVED', 
      description: 'Loan application has been approved',
      icon: <CheckCircle2 size={20} />
    },
    { 
      status: 'REJECTED', 
      description: 'Loan application has been rejected',
      icon: <XCircle size={20} />
    },
    { 
      status: 'DISBURSED', 
      description: 'Loan amount has been disbursed to the account',
      icon: <Banknote size={20} />
    }
  ];

  const loanTypes: LoanType[] = ['PERSONAL', 'HOME', 'BUSINESS', 'VEHICLE'];
  const bankTeam = ['Priya Sharma', 'Amit Kumar', 'Sneha Patel', 'Rajesh Verma'];

  const statusTransitions: Record<LoanStatus, StatusTransition> = {
    SUBMITTED: {
      from: 'SUBMITTED',
      to: ['UNDER_REVIEW']
    },
    UNDER_REVIEW: {
      from: 'UNDER_REVIEW',
      to: ['APPROVED', 'REJECTED', 'CHANGES_REQUIRED']
    },
    CHANGES_REQUIRED: {
      from: 'CHANGES_REQUIRED',
      to: ['UNDER_REVIEW']
    },
    APPROVED: {
      from: 'APPROVED',
      to: ['DISBURSED']
    },
    REJECTED: {
      from: 'REJECTED',
      to: []
    },
    DISBURSED: {
      from: 'DISBURSED',
      to: []
    }
  };

  const getAvailableTransitions = (currentStatus: LoanStatus) => {
    return statusTransitions[currentStatus]?.to || [];
  };

  const getStatusIcon = (status: LoanStatus) => {
    switch (status) {
      case 'SUBMITTED':
        return <ClipboardCheck size={20} />;
      case 'UNDER_REVIEW':
        return <Search size={20} />;
      case 'CHANGES_REQUIRED':
        return <FileWarning size={20} />;
      case 'APPROVED':
        return <CheckCircle2 size={20} />;
      case 'REJECTED':
        return <XCircle size={20} />;
      case 'DISBURSED':
        return <Banknote size={20} />;
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: comments.length + 1,
      author: "Rahul DSA",
      isBank: false,
      content: newComment,
      timestamp: 'Just now'
    };

    setComments([...comments, comment]);
    setNewComment('');

    const timelineEvent: TimelineEvent = {
      id: timeline.length + 1,
      type: 'comment',
      content: `Comment added by ${comment.author}`,
      timestamp: 'Just now'
    };

    setTimeline([...timeline, timelineEvent]);
  };

  const handleStatusChange = (newStatus: LoanStatus) => {
    // Create timeline event for status change
    const timelineEvent: TimelineEvent = {
      id: timeline.length + 1,
      type: 'status_change',
      content: `Status changed from ${toPascalCase(status)} to ${toPascalCase(newStatus)}${transitionComment ? ` - ${transitionComment}` : ''}`,
      timestamp: 'Just now',
      oldStatus: status,
      newStatus: newStatus
    };

    // Update the status
    setStatus(newStatus);
    
    // Add the event to timeline
    setTimeline([...timeline, timelineEvent]);

    // Update assignee if changed
    if (transitionAssignee && transitionAssignee !== assignee) {
      setAssignee(transitionAssignee);
    }
    
    // Reset and close modal
    setIsStatusModalOpen(false);
    setSelectedStatus(null);
    setTransitionComment('');
    setTransitionAssignee('');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isDropdownOpen && 
        event.target instanceof Node && 
        !event.target.closest('[data-dropdown]')
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <PageContainer>
      <Header isLoggedIn />
      <ContentWrapper>
        <FlexContainer>
          <MainContent>
            <Card>
              <AppHeader>
                <TicketId>
                  <BadgeIndianRupee size={16} />
                  <span>LOAN-2024-456</span>
                </TicketId>
                <StatusContainer>
                  <Badge variant={status}>{toPascalCase(status)}</Badge>
                  <Badge variant={loanType}>{loanType}</Badge>
                </StatusContainer>
              </AppHeader>
              <Title>Personal Loan Application - Raj Patel</Title>
              <InfoGrid>
                <InfoItem>
                  <IndianRupee size={16} />
                  <span>Loan Amount: ₹5,00,000</span>
                </InfoItem>
                <InfoItem>
                  <Clock size={16} />
                  <span>Tenure: 36 months</span>
                </InfoItem>
                <InfoItem>
                  <FileCheck size={16} />
                  <span>CIBIL Score: 750</span>
                </InfoItem>
              </InfoGrid>

              <DocumentsSection>
                <SectionTitle>
                  <Paperclip size={20} />
                  Required Documents ({attachments.length})
                </SectionTitle>
                <DocumentGrid>
                  {attachments.map(attachment => (
                    <DocumentItem key={attachment.id}>
                      <Paperclip size={16} />
                      <DocumentInfo>
                        <DocumentName>{attachment.name}</DocumentName>
                        <DocumentMeta>{attachment.size} • {attachment.type}</DocumentMeta>
                      </DocumentInfo>
                    </DocumentItem>
                  ))}
                </DocumentGrid>
              </DocumentsSection>
            </Card>

            <Card>
              <SectionTitle>
                <Clock size={20} />
                Application Timeline
              </SectionTitle>
              <Timeline>
                {timeline.map((event, index) => (
                  <TimelineItem key={event.id}>
                    <TimelineDot />
                    <TimelineContent>
                      <TimelineText>{event.content}</TimelineText>
                      <TimelineTime>{event.timestamp}</TimelineTime>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Card>

            <Card>
              <SectionTitle>
                <MessageSquare size={20} />
                Discussion ({comments.length})
              </SectionTitle>

              <CommentList>
                {comments.map(comment => (
                  <CommentItem key={comment.id}>
                    <Avatar isBank={comment.isBank}>
                      {comment.isBank ? (
                        <Building2 size={20} />
                      ) : (
                        <User size={20} />
                      )}
                    </Avatar>
                    <CommentContent>
                      <CommentHeader>
                        <CommentAuthor>{comment.author}</CommentAuthor>
                        <CommentRole isBank={comment.isBank}>
                          {comment.isBank ? 'Bank Officer' : 'DSA Agent'}
                        </CommentRole>
                        <CommentTime>{comment.timestamp}</CommentTime>
                      </CommentHeader>
                      <CommentText>{comment.content}</CommentText>
                    </CommentContent>
                  </CommentItem>
                ))}
              </CommentList>

              <CommentForm onSubmit={handleCommentSubmit}>
                <CommentInput
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Type your response..."
                />
                <SendButton type="submit">
                  <Send size={20} />
                </SendButton>
              </CommentForm>
            </Card>
          </MainContent>

          <Sidebar>
            <Card>
              <FormGroup>
                <Label>Application Status</Label>
                <StatusDropdown data-dropdown>
                  <StatusTransitionButton 
                    onClick={() => {
                      const availableTransitions = getAvailableTransitions(status);
                      if (availableTransitions.length > 0) {
                        setIsDropdownOpen(!isDropdownOpen);
                      }
                    }}
                    status={status}
                  >
                    <div className="status-group">
                      {getStatusIcon(status)}
                      <span>{toPascalCase(status)}</span>
                    </div>
                    {getAvailableTransitions(status).length > 0 && (
                      <ChevronDown 
                        size={16} 
                        style={{ 
                          transform: isDropdownOpen ? 'rotate(180deg)' : 'none',
                          transition: 'transform 0.2s ease'
                        }} 
                      />
                    )}
                  </StatusTransitionButton>

                  {isDropdownOpen && (
                    <DropdownMenu>
                      {getAvailableTransitions(status).map((nextStatus) => (
                        <DropdownItem
                          key={nextStatus}
                          status={nextStatus}
                          isDropdownItem={true}
                          onClick={() => {
                            setIsDropdownOpen(false);
                            setSelectedStatus(nextStatus);
                            setIsStatusModalOpen(true);
                          }}
                        >
                          {getStatusIcon(nextStatus)}
                          <span>{toPascalCase(nextStatus)}</span>
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  )}
                </StatusDropdown>
              </FormGroup>

              <FormGroup>
                <Label>Loan Type</Label>
                <SelectWrapper>
                  <Select
                    value={loanType}
                    onChange={(e) => setLoanType(e.target.value as LoanType)}
                  >
                    {loanTypes.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </Select>
                  <ChevronDown size={20} />
                </SelectWrapper>
              </FormGroup>

              <FormGroup>
                <Label>Reviewing Officer</Label>
                <SelectWrapper>
                  <Select
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                  >
                    {bankTeam.map(member => (
                      <option key={member} value={member}>{member}</option>
                    ))}
                  </Select>
                  <ChevronDown size={20} />
                </SelectWrapper>
              </FormGroup>

              <FormGroup>
                <Label>Submitted On</Label>
                <InfoItem>
                  <Clock size={16} />
                  <span>March 15, 2024 10:30 AM</span>
                </InfoItem>
              </FormGroup>

              <FormGroup>
                <Label>Last Updated</Label>
                <InfoItem>
                  <Clock size={16} />
                  <span>1 hour ago</span>
                </InfoItem>
              </FormGroup>

              <FormGroup>
                <Label>Branch</Label>
                <InfoItem>
                  <Building2 size={16} />
                  <span>Andheri East, Mumbai</span>
                </InfoItem>
              </FormGroup>
            </Card>
          </Sidebar>
        </FlexContainer>
      </ContentWrapper>

      <AnimatePresence>
        {isStatusModalOpen && selectedStatus && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ModalContent
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{
                duration: 0.2,
                ease: [0.14, 1.12, 0.67, 0.99] // Custom easing for a more polished feel
              }}
            >
              <ModalHeader>
                <ModalTitle>Change status</ModalTitle>
                <CloseButton onClick={() => {
                  setIsStatusModalOpen(false);
                  setSelectedStatus(null);
                  setTransitionComment('');
                  setTransitionAssignee('');
                }}>
                  <X size={20} />
                </CloseButton>
              </ModalHeader>
              <ModalBody>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <ModalSection>
                    <StatusOptionList>
                      <StatusOption
                        variant={selectedStatus}
                        isSelected={true}
                      >
                        {getStatusIcon(selectedStatus)}
                        <StatusInfo>
                          <StatusName variant={selectedStatus}>{toPascalCase(selectedStatus)}</StatusName>
                          <StatusDescription>
                            {getStatusDescription(selectedStatus, status)}
                          </StatusDescription>
                        </StatusInfo>
                      </StatusOption>
                    </StatusOptionList>
                  </ModalSection>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <ModalSection>
                    <ModalLabel>Assignee</ModalLabel>
                    <AssigneeSelect
                      value={transitionAssignee || assignee}
                      onChange={(e) => setTransitionAssignee(e.target.value)}
                    >
                      {bankTeam.map(member => (
                        <option key={member} value={member}>{member}</option>
                      ))}
                    </AssigneeSelect>
                  </ModalSection>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <ModalSection>
                    <ModalLabel>Comment</ModalLabel>
                    <CommentTextarea
                      value={transitionComment}
                      onChange={(e) => setTransitionComment(e.target.value)}
                      placeholder="Add a comment..."
                    />
                  </ModalSection>
                </motion.div>
              </ModalBody>
              <ModalFooter>
                <Button onClick={() => {
                  setIsStatusModalOpen(false);
                  setSelectedStatus(null);
                  setTransitionComment('');
                  setTransitionAssignee('');
                }}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleStatusChange(selectedStatus)}
                >
                  {toPascalCase(selectedStatus)}
                </Button>
              </ModalFooter>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </PageContainer>
  );
}

// Helper function to get status transition descriptions
const getStatusDescription = (nextStatus: LoanStatus, currentStatus: LoanStatus) => {
  switch (nextStatus) {
    case 'UNDER_REVIEW':
      return currentStatus === 'CHANGES_REQUIRED' 
        ? 'Resume reviewing the application after changes'
        : 'Start reviewing the loan application';
    case 'CHANGES_REQUIRED':
      return 'Request changes or additional information';
    case 'APPROVED':
      return 'Approve the loan application';
    case 'REJECTED':
      return 'Reject the loan application';
    case 'DISBURSED':
      return 'Mark loan as disbursed';
    default:
      return '';
  }
};

// Helper function to convert a string to Pascal Case
const toPascalCase = (str: string) => {
  return str.split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export default ApplicationDetails;